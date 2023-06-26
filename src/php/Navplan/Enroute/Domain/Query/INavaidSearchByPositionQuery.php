<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Query;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Enroute\Domain\Model\Navaid;


interface INavaidSearchByPositionQuery {
    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Navaid[]
     */
    function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array;
}
