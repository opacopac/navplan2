<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Service\CloudMeteoGramService;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Terrain\Domain\Service\ITerrainService;


class ProdMeteoGramDiContainer implements IMeteoGramDiContainer {
    private IRestController $readCloudMeteoGramController;
    private ICloudMeteoGramService $cloudMeteoGramService;


    public function __construct(
        private readonly IHttpService $httpService,
        private readonly IMeteoForecastVerticalCloudRepo $verticalCloudRepo,
        private readonly IMeteoForecastPrecipRepo $precipRepo,
        private readonly IMeteoForecastTempRepo $tempRepo,
        private readonly ITerrainService $terrainService
    ) {
    }


    public function getReadCloudMeteoGramController(): IRestController {
        if (!isset($this->readCloudMeteoGramController)) {
            $this->readCloudMeteoGramController = new ReadCloudMeteogramController(
                $this->httpService,
                $this->getCloudMeteoGramService()
            );
        }

        return $this->readCloudMeteoGramController;
    }


    public function getCloudMeteoGramService(): ICloudMeteoGramService {
        if (!isset($this->cloudMeteoGramService)) {
            $this->cloudMeteoGramService = new CloudMeteoGramService(
                $this->verticalCloudRepo,
                $this->precipRepo,
                $this->tempRepo,
                $this->terrainService
            );
        }

        return $this->cloudMeteoGramService;
    }
}
