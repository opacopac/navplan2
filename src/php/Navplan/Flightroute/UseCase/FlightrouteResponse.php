<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\Flightroute\DomainModel\Flightroute;


class FlightrouteResponse {
    public function __construct(public ?Flightroute $flightroute)
    {
    }
}
