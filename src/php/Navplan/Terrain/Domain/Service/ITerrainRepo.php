<?php declare(strict_types=1);

namespace Navplan\Terrain\Domain\Service;


use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Position3d;

interface ITerrainRepo {
    /**
     * @param Position2d[] $position2dList
     * @return Position3d[]
     */
    function readElevations(array $position2dList): array;
}
