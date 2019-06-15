<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\FlightrouteListResponse;


class RestFlightrouteListResponse {
    public static function toRest(FlightrouteListResponse $response): array  {
        return array(
            "navplanList" => array_map(
                function ($flightroute) { return RestFlightroute::toListResultArray($flightroute); },
                $response->flightrouteList
            )
        );
    }
}
