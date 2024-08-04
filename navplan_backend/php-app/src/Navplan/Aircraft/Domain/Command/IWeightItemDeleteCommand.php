<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;


interface IWeightItemDeleteCommand
{
    function deleteByAircraft(int $aircraftId): void;
}
