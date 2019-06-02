<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class ReadFlightrouteRequest {
    public $flightrouteId;
    public $token;


    public function __construct(
        int $flightrouteId,
        string $token
    ) {
        $this->flightrouteId = $flightrouteId;
        $this->token = $token;
    }
}
