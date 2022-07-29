<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceSearchByPositionQuery {
    /**
     * @param Position2d $position2d
     * @return Airspace[]
     */
    function searchByPosition(Position2d $position2d): array;
}
