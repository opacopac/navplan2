<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\DeleteFlightroute;


class DeleteFlightrouteRequest {
    public function __construct(
        public int $flightrouteId,
        public string $token
    ) {
    }
}
