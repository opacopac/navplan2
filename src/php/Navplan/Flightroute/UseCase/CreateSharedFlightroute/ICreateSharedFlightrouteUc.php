<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateSharedFlightroute;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


interface ICreateSharedFlightrouteUc {
    public function create(CreateSharedFlightrouteRequest $request): FlightrouteResponse;
}
