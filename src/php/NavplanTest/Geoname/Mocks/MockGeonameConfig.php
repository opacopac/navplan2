<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Terrain\UseCase\ITerrainRepo;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;


class MockGeonameConfig implements IGeonameConfig {
    private $geonameRepoMock;
    private $terrainRepoMock;


    public function __construct() {
        $this->geonameRepoMock = new MockGeonameRepo();
        $this->terrainRepoMock = new MockTerrainRepo();
    }


    public function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepoMock;
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepoMock;
    }
}
