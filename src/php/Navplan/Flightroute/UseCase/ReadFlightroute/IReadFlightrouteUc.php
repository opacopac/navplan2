<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightroute;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


interface IReadFlightrouteUc {
    public function read(ReadFlightrouteRequest $request): FlightrouteResponse;
}
