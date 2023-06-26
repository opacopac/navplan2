<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\System\Domain\Service\IFileService;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\Terrain\Domain\Service\TerrainService;
use Navplan\Terrain\File\Service\FileTerrainRepo;


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
