<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipService;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\Importer\Service\OpenAipImporter;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdOpenAipDiContainer implements IOpenAipDiContainer
{
    private IOpenAipConfig $openAipConfig;
    private IOpenAipImporter $openAipImporter;
    private IOpenAipService $openAipApiService;


    public function __construct(
        private IAirportService $airportService,
        private IAirspaceService $airspaceService,
        private INavaidService $navaidService,
        private ILoggingService $loggingService,
        private IDbService $dbService,
        private ICurlService $curlService,
    )
    {
    }


    function getOpenAipConfig(): IOpenAipConfig
    {
        if (!isset($this->openAipConfig)) {
            $this->openAipConfig = new ProdConfigDiContainer();
        }

        return $this->openAipConfig;
    }


    public function getOpenAipImporter(): IOpenAipImporter
    {
        if (!isset($this->openAipImporter)) {
            $this->openAipImporter = new OpenAipImporter(
                $this->getOpenAipApiService(),
                $this->airportService,
                $this->airspaceService,
                $this->navaidService,
                $this->loggingService,
                $this->dbService
            );
        }

        return $this->openAipImporter;
    }


    public function getOpenAipApiService(): IOpenAipService
    {
        if (!isset($this->openAipApiService)) {
            $this->openAipApiService = new OpenAipService(
                $this->getOpenAipConfig(),
                $this->curlService
            );
        }

        return $this->openAipApiService;
    }
}
