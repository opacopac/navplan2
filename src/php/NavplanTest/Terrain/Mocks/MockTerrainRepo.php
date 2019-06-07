<?php declare(strict_types=1);

namespace NavplanTest\Terrain\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\Position3d;
use Navplan\Terrain\UseCase\ITerrainRepo;


class MockTerrainRepo implements ITerrainRepo {
    /* @var $altitudeResult Altitude */
    public $altitudeResult;


    public function readElevation(array $position2dList): array {
        return array_map(
            function ($pos) { return new Position3d($pos->longitude, $pos->latitude, $this->altitudeResult); },
            $position2dList
        );
    }
}
