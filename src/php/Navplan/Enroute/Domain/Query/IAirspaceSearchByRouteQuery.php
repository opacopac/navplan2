<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceSearchByRouteQuery {
    /**
     * @param Position2d[] $lonLatList
     * @return Airspace[]
     */
    function searchByRouteIntersection(array $lonLatList): array;
}
