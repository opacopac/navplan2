<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Query;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Common\Domain\Model\Position2d;


interface IAirspaceSearchByPositionQuery {
    /**
     * @param Position2d $position2d
     * @return Airspace[]
     */
    function searchByPosition(Position2d $position2d): array;
}
