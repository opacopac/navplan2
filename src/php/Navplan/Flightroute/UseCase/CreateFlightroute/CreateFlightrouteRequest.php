<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateFlightroute;

use Navplan\Flightroute\DomainModel\Flightroute;


class CreateFlightrouteRequest {
    public function __construct(
        public Flightroute $flightroute,
        public string $token
    ) {
    }
}
