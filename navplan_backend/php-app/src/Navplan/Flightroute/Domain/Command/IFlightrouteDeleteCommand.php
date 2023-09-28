<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\User\Domain\Model\User;


interface IFlightrouteDeleteCommand {
    function delete(int $flightrouteId, User $user);
}
