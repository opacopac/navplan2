<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\System\DomainService\IFileService;
use Navplan\Terrain\DomainService\ITerrainConfig;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\Terrain\DomainService\TerrainService;
use Navplan\Terrain\FileService\FileTerrainRepo;


class ProdTerrainDiContainer implements ITerrainDiContainer {
    private ITerrainService $terrainService;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly ITerrainConfig $terrainConfig
    ) {
    }


    function getTerrainService(): ITerrainService {
        if (!isset($this->terrainService)) {
            $this->terrainService = new TerrainService(
                new FileTerrainRepo(
                    $this->fileService,
                    $this->terrainConfig
                )
            );
        }

        return $this->terrainService;
    }
}
