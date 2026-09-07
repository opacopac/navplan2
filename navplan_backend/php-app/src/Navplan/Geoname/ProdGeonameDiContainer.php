<?php declare(strict_types=1);

namespace Navplan\Geoname;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Geoname\Domain\Service\GeonameService;
use Navplan\Geoname\Domain\Service\IGeonameRepo;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Geoname\Persistence\Repo\DbGeonameRepo;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\Terrain\Domain\Service\ITerrainService;
use function DI\autowire;


class ProdGeonameDiContainer implements IGeonameDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        ITerrainService $terrainService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IDbService::class => $dbService,
            ITerrainService::class => $terrainService,

            // interface -> implementation bindings (only mapping needed per class)
            IGeonameRepo::class => autowire(DbGeonameRepo::class),
            IGeonameService::class => autowire(GeonameService::class),
        ]);

        $this->container = $builder->build();
    }


    function getGeonameService(): IGeonameService
    {
        return $this->container->get(IGeonameService::class);
    }
}

