<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\DomainModel\User;


interface IFlightrouteByIdQuery {
    function read(int $flightrouteId, User $user): ?Flightroute;
}
