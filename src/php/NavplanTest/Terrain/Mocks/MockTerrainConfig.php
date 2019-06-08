<?php declare(strict_types=1);

namespace NavplanTest\Terrain\Mocks;

use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;


class MockTerrainConfig implements ITerrainConfig {
    private $terrainRepo;


    public function __construct() {
        $this->terrainRepo = new MockTerrainRepo();
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }
}
