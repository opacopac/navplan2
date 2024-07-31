<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;


interface IDistancePerformanceTableDeleteCommand
{
    function deleteByAircraft(int $aircraftId);
}
