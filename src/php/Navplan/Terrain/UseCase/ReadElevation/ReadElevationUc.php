<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase\ReadElevation;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;
use Navplan\Terrain\DomainService\ITerrainRepo;


class ReadElevationUc implements IReadElevationUc {
    public function __construct(private ITerrainRepo $repo) {
    }


    public function read(Position2d $position): ?Position3d {
        $pos3dList = $this->repo->readElevation([$position]);

        if ($pos3dList && count($pos3dList) > 0)
            return $pos3dList[0];
        else
            return NULL;
    }
}
