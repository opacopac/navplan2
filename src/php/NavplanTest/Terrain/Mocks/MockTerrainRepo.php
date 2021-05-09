<?php declare(strict_types=1);

namespace NavplanTest\Terrain\Mocks;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position3d;
use Navplan\Terrain\DomainService\ITerrainRepo;


class MockTerrainRepo implements ITerrainRepo {
    public Altitude $altitudeResult;


    public function readElevation(array $position2dList): array {
        return array_map(
            function ($pos) { return new Position3d($pos->longitude, $pos->latitude, $this->altitudeResult); },
            $position2dList
        );
    }
}
