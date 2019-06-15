<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Rest\RestFlightroute;


class RestFlightrouteResponse {
    public static function toRest(FlightrouteResponse $response): array  {
        return array(
            "navplan" => $response->flightroute ? RestFlightroute::toArray($response->flightroute) : NULL
        );
    }
}
