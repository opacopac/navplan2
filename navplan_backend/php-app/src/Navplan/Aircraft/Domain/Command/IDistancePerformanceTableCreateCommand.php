<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;

use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;


interface IDistancePerformanceTableCreateCommand
{
    function create(int $aircraftId, PerfDistTableType $tableType, DistancePerformanceTable $perfTable): void;
}
