<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;


interface IFlightrouteByIdQuery
{
    function read(int $flightrouteId, int $userId): ?Flightroute;
}
