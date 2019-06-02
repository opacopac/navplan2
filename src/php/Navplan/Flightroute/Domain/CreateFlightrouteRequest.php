<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class CreateFlightrouteRequest {
    public $flightroute;
    public $token;


    public function __construct(
        Flightroute $flightroute,
        string $token
    ) {
        $this->flightroute = $flightroute;
        $this->token = $token;
    }
}
