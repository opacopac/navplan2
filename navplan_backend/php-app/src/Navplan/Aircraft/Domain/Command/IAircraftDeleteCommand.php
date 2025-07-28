<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;


interface IAircraftDeleteCommand
{
    function delete(int $aircraftId, int $userId): bool;
}
