<?php declare(strict_types=1);

namespace Navplan\Terrain;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\System\Domain\Service\IFileService;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Terrain\Domain\Service\ITerrainRepo;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\Terrain\Domain\Service\TerrainService;
use Navplan\Terrain\File\Service\FileTerrainRepo;
use function DI\autowire;


class ProdTerrainDiContainer implements ITerrainDiContainer
{
    private Container $container;


    public function __construct(
        IFileService $fileService,
        ITerrainConfig $terrainConfig
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IFileService::class => $fileService,
            ITerrainConfig::class => $terrainConfig,

            // interface -> implementation bindings
            ITerrainRepo::class => autowire(FileTerrainRepo::class),
            ITerrainService::class => autowire(TerrainService::class),
        ]);

        $this->container = $builder->build();
    }


    function getTerrainService(): ITerrainService
    {
        return $this->container->get(ITerrainService::class);
    }
}
