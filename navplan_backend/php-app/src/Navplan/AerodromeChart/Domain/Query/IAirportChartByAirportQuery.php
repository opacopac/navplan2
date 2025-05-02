<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Query;


use Navplan\AerodromeChart\Domain\Model\AirportChart2;

interface IAirportChartByAirportQuery
{
    /**
     * @param string $airportIcao
     * @param int $userId
     * @return AirportChart2[]
     */
    function readList(string $airportIcao, int $userId): array;
}
