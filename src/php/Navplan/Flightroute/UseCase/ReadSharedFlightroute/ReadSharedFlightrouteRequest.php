<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadSharedFlightroute;


class ReadSharedFlightrouteRequest {
    public function __construct(public string $shareId) {
    }
}
