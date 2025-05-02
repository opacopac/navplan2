<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Command;

use Navplan\AerodromeChart\Domain\Model\AirportChart2;


interface IAirportChartCreateCommand
{
    function create(AirportChart2 $airportChart, int $userId): AirportChart2;
}
