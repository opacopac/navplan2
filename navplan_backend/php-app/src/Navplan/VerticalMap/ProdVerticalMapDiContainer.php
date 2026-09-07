<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\Domain\Service\VerticalMapService;
use Navplan\VerticalMap\Rest\Service\VerticalMapController;
use function DI\autowire;


class ProdVerticalMapDiContainer implements IVerticalMapDiContainer
{
    private Container $container;


    public function __construct(
        ITerrainService $terrainService,
        IAirspaceService $airspaceService,
        IMeteoForecastVerticalCloudRepo $verticalCloudRepo,
        IMeteoForecastVerticalWindRepo $verticalWindRepo,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            ITerrainService::class => $terrainService,
            IAirspaceService::class => $airspaceService,
            IMeteoForecastVerticalCloudRepo::class => $verticalCloudRepo,
            IMeteoForecastVerticalWindRepo::class => $verticalWindRepo,
            IHttpService::class => $httpService,

            // interface -> implementation bindings
            IVerticalMapService::class => autowire(VerticalMapService::class),
            IRestController::class => autowire(VerticalMapController::class),
        ]);

        $this->container = $builder->build();
    }


    function getVerticalMapController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    function getVerticalMapService(): IVerticalMapService
    {
        return $this->container->get(IVerticalMapService::class);
    }
}
