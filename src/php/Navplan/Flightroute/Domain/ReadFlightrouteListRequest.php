<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class ReadFlightrouteListRequest {
    public $token;


    public function __construct(
        string $token
    ) {
        $this->token = $token;
    }
}
