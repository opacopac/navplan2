<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class CreateSharedFlightrouteRequest {
    public $flightroute;


    public function __construct(
        Flightroute $flightroute
    ) {
        $this->flightroute = $flightroute;
    }
}
