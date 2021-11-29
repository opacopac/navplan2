<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\VerticalMap\DomainModel\VerticalMap;


interface IVerticalMapService {
    /**
     * @param Position2d[] $waypointPositions
     * @return VerticalMap
     */
    public function getRouteVerticalMap(array $waypointPositions): VerticalMap;
}
