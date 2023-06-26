<?php declare(strict_types=1);

namespace NavplanTest\Terrain\Mocks;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position3d;
use Navplan\Terrain\Domain\Service\ITerrainRepo;


class MockTerrainRepo implements ITerrainRepo {
    public Altitude $altitudeResult;


    public function readElevations(array $position2dList): array {
        return array_map(
            function ($pos) { return new Position3d($pos->longitude, $pos->latitude, $this->altitudeResult); },
            $position2dList
        );
    }
}
