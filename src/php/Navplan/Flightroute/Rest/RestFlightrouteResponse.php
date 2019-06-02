<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Rest\RestFlightroute;


class RestFlightrouteResponse {
    public static function toArray(FlightrouteResponse $response): array  {
        return array(
            "navplan" => RestFlightroute::toArray($response->flightroute)
        );
    }
}
