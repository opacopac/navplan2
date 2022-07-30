<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\User\DomainModel\User;


interface IFlightrouteDeleteCommand {
    function delete(int $flightrouteId, User $user);
}
