<?php declare(strict_types=1);

namespace Navplan\Terrain\Domain\Service;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;


interface ITerrainService {
    /**
     * @param Position2d[] $positionList
     * @return Position3d[]
     */
    function readElevations(array $positionList): array;
}
