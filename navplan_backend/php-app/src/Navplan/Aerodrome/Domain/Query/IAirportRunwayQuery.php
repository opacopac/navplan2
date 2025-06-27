<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunway;


interface IAirportRunwayQuery
{
    /**
     * @param int $airportId
     * @return AirportRunway[]
     */
    function read(int $airportId): array;
}
