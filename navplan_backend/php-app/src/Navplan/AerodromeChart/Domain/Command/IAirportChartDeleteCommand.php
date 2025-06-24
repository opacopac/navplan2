<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Command;


interface IAirportChartDeleteCommand
{
    function delete(int $airportChartId, int $userId);
}
