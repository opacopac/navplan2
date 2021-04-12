<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightrouteList;


class ReadFlightrouteListRequest {
    public function __construct(public string $token) {
    }
}
