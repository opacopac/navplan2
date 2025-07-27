<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Common\Domain\Model\Position2d;


interface IAirspaceSearchByRouteQuery {
    /**
     * @param Position2d[] $pos2dList
     * @return Airspace[]
     */
    function searchByRouteIntersection(array $pos2dList): array;
}
