<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\UpdateFlightroute;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


interface IUpdateFlightrouteUc {
    public function update(UpdateFlightrouteRequest $request): FlightrouteResponse;
}
