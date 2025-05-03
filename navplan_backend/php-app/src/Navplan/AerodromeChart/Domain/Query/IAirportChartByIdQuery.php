<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Query;


use Navplan\AerodromeChart\Domain\Model\AirportChart;

interface IAirportChartByIdQuery
{
    function read(int $id, int $userId): AirportChart;
}
