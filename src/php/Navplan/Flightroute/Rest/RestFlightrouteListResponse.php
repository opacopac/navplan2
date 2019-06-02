<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\FlightrouteListResponse;
use Navplan\Flightroute\Rest\RestFlightroute;


class RestFlightrouteListResponse {
    public static function toArray(FlightrouteListResponse $response): array  {
        return array(
            "navplanList" => array_map(
                function ($flightroute) { return RestFlightroute::toListResultArray($flightroute); },
                $response->flightrouteList
            )
        );
    }
}
