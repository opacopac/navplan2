<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateSharedFlightroute;

use Navplan\Flightroute\Domain\Flightroute;


class CreateSharedFlightrouteRequest {
    public function __construct(
        public Flightroute $flightroute
    ) {
    }
}
