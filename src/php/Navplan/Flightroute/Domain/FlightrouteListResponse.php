<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class FlightrouteListResponse {
    public $flightrouteList;


    public function __construct(
        array $flightrouteList
    )
    {
        $this->flightrouteList = $flightrouteList;
    }
}
