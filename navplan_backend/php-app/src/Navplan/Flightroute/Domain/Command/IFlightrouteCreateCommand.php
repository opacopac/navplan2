<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\Domain\Model\User;


interface IFlightrouteCreateCommand {
    function create(Flightroute $flightroute, ?User $user): Flightroute;
}
