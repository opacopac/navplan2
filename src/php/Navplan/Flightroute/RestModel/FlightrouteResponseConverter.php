<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\FlightrouteResponse;


class FlightrouteResponseConverter {
    public static function toRest(FlightrouteResponse $response): array  {
        return array(
            "navplan" => $response->flightroute ? RestFlightrouteConverter::toRest($response->flightroute) : NULL
        );
    }
}
