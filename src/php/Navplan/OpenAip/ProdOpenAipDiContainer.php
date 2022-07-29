<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipService;
use Navplan\OpenAip\Config\IOpenAipConfigService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\Importer\Service\OpenAipImporter;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;


class ProdOpenAipDiContainer implements IOpenAipDiContainer
{
    private IOpenAipConfigService $openAipConfigService;
    private IOpenAipImporter $openAipImporter;
    private IOpenAipService $openAipApiService;


    public function __construct(
        private IAirportService $airportService,
        private IAirspaceService $airspaceService,
        private INavaidService $navaidService,
        private ILoggingService $loggingService,
        private IDbService $dbService
    ) {
    }


    function getNotamConfigService(): IOpenAipConfigService {
        if (!isset($this->openAipConfigService)) {
            $this->openAipConfigService = new ProdConfigDiContainer();
        }

        return $this->openAipConfigService;
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
                $this->getNotamConfigService()
            );
        }

        return $this->openAipApiService;
    }
}
