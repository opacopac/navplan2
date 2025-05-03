<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Query;


use Navplan\AerodromeChart\Domain\Model\AirportChart;

interface IAirportChartByAirportQuery
{
    /**
     * @param string $airportIcao
     * @param int $userId
     * @return AirportChart[]
     */
    function readList(string $airportIcao, int $userId): array;
}
