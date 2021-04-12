<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateFlightroute;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


interface ICreateFlightrouteUc {
    public function create(CreateFlightrouteRequest $request): FlightrouteResponse;
}
