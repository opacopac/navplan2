<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;


interface IWaypointsDeleteCommand {
    function deleteWaypoints(int $flightrouteId);
}
