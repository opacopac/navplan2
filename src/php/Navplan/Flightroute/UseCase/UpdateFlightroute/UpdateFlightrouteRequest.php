<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\UpdateFlightroute;

use Navplan\Flightroute\Domain\Flightroute;


class UpdateFlightrouteRequest {
    public function __construct(
        public Flightroute $flightroute,
        public string $token
    ) {
    }
}
