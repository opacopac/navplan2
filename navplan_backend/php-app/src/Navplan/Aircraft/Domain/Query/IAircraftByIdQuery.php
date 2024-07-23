<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\User\Domain\Model\User;


interface IAircraftByIdQuery
{
    function read(int $aircraftId, User $user): ?Aircraft;
}
