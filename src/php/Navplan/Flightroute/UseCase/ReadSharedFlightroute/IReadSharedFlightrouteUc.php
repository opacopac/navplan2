<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadSharedFlightroute;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


interface IReadSharedFlightrouteUc {
    public function read(ReadSharedFlightrouteRequest $request): FlightrouteResponse;
}
