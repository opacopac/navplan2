<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Command;

use Navplan\AerodromeChart\Domain\Model\AirportChart;


interface IAirportChartCreateCommand
{
    function create(AirportChart $airportChart, int $userId): AirportChart;
}
