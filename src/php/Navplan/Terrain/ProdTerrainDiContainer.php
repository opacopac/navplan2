<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\System\DomainService\IFileService;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\Terrain\DomainService\TerrainService;
use Navplan\Terrain\FileService\FileTerrainRepo;


class ProdTerrainDiContainer implements ITerrainDiContainer {
    private const TERRAIN_TILE_BASE_DIR = __DIR__ . '/../../../../terraintiles/';

    private ITerrainService $terrainService;


    public function __construct(
        private IFileService $fileService
    ) {
    }


    function getTerrainService(): ITerrainService {
        if (!isset($this->terrainService)) {
            $this->terrainService = new TerrainService(
                new FileTerrainRepo(
                    $this->fileService,
                    self::TERRAIN_TILE_BASE_DIR
                )
            );
        }

        return $this->terrainService;
    }
}
