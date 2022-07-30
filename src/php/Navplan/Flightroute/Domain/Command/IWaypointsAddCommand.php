<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\Flightroute\Domain\Model\Flightroute;


interface IWaypointsAddCommand {
    function addWaypointsAndAlternate(Flightroute $flightroute);
}
