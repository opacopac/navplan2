<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Common\Domain\Model\Position2d;


interface IAirspaceSearchByRouteQuery {
    /**
     * @param Position2d[] $lonLatList
     * @return Airspace[]
     */
    function searchByRouteIntersection(array $lonLatList): array;
}
