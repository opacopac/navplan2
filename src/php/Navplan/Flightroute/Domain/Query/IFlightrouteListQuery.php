<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\User\Domain\Model\User;


interface IFlightrouteListQuery {
    /**
     * @param User $user
     * @return Flightroute[]
     */
    function readList(User $user): array;
}
