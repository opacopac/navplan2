<?php declare(strict_types=1);

namespace Navplan\Terrain\DomainService;


use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;

interface ITerrainRepo {
    /**
     * @param Position2d[] $position2dList
     * @return Position3d[]
     */
    function readElevations(array $position2dList): array;
}
