<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;


interface IFlightrouteDeleteCommand
{
    function delete(int $flightrouteId, int $userId);
}
