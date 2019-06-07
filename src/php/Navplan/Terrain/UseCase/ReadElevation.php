<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Position3d;


class ReadElevation {
    /* @var $repo ITerrainRepo */
    private $repo;


    public function __construct(ITerrainRepo $repo) {
        $this->repo = $repo;
    }


    public function read(Position2d $position): Position3d {
        $pos3dList = $this->repo->readElevation([$position]);

        if ($pos3dList && count($pos3dList) > 0)
            return $pos3dList[0];
        else
            return NULL;
    }
}
