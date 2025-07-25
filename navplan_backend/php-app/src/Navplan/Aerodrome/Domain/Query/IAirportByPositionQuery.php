<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;


use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Common\Domain\Model\Position2d;

interface IAirportByPositionQuery
{
    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Airport[]
     */
    function search(Position2d $position, float $maxRadius_deg, int $maxResults): array;
}
