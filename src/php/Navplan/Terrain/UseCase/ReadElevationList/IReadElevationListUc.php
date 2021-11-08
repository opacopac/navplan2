<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase\ReadElevationList;


use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;

interface IReadElevationListUc {
    /**
     * @param Position2d[] $posList
     * @return Position3d[]
     */
    public function read(array $posList): array;
}
