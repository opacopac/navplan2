<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightrouteList;


class ReadFlightrouteListResponse {
    public function __construct(public array $flightrouteList)
    {
    }
}
