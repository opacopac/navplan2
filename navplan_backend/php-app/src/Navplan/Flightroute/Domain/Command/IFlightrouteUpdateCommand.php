<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Command;

use Navplan\Flightroute\Domain\Model\Flightroute;


interface IFlightrouteUpdateCommand
{
    function update(Flightroute $flightroute, int $userId): Flightroute;
}
