<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\DeleteFlightroute;


interface IDeleteFlightrouteUc {
    public function delete(DeleteFlightrouteRequest $request): void;
}
