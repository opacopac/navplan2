<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\DomainModel\User;


interface IFlightrouteUpdateCommand {
    function update(Flightroute $flightroute, User $user): Flightroute;
}
