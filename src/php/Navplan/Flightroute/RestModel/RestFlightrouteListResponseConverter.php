<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\ReadFlightrouteList\ReadFlightrouteListResponse;


class RestFlightrouteListResponseConverter {
    public static function toRest(ReadFlightrouteListResponse $response): array  {
        return array(
            "navplanList" => array_map(
                function ($flightroute) { return RestFlightrouteConverter::toRestShort($flightroute); },
                $response->flightrouteList
            )
        );
    }
}
