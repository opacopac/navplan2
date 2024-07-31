<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;


interface IAircraftByIdQuery
{
    function read(int $aircraftId, int $userId): ?Aircraft;
}
