<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Service\CloudMeteoGramService;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Terrain\Domain\Service\ITerrainService;
use function DI\autowire;


class ProdMeteoGramDiContainer implements IMeteoGramDiContainer
{
    private Container $container;


    public function __construct(
        IHttpService $httpService,
        IMeteoForecastVerticalCloudRepo $verticalCloudRepo,
        IMeteoForecastPrecipRepo $precipRepo,
        IMeteoForecastTempRepo $tempRepo,
        ITerrainService $terrainService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IHttpService::class => $httpService,
            IMeteoForecastVerticalCloudRepo::class => $verticalCloudRepo,
            IMeteoForecastPrecipRepo::class => $precipRepo,
            IMeteoForecastTempRepo::class => $tempRepo,
            ITerrainService::class => $terrainService,

            // interface -> implementation bindings (only mapping needed per class)
            ICloudMeteoGramService::class => autowire(CloudMeteoGramService::class),
            IRestController::class => autowire(ReadCloudMeteogramController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getReadCloudMeteoGramController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getCloudMeteoGramService(): ICloudMeteoGramService
    {
        return $this->container->get(ICloudMeteoGramService::class);
    }
}

