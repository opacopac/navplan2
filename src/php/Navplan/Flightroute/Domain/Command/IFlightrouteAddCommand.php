<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\DomainModel\User;


interface IFlightrouteAddCommand {
    function add(Flightroute $flightroute, ?User $user): Flightroute;
}
