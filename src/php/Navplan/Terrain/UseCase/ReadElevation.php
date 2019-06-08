<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Position3d;


class ReadElevation {
    /* @var $repo ITerrainRepo */
    private $repo;


    public function __construct(ITerrainConfig $config) {
        $this->repo = $config->getTerrainRepo();
    }


    public function read(Position2d $position): Position3d {
        $pos3dList = $this->repo->readElevation([$position]);

        if ($pos3dList && count($pos3dList) > 0)
            return $pos3dList[0];
        else
            return NULL;
    }
}
