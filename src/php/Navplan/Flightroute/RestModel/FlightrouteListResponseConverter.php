<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\ReadFlightrouteList\ReadFlightrouteListResponse;


class FlightrouteListResponseConverter {
    public static function toRest(ReadFlightrouteListResponse $response): array  {
        return array(
            "navplanList" => array_map(
                function ($flightroute) { return FlightrouteConverter::toListResultArray($flightroute); },
                $response->flightrouteList
            )
        );
    }
}
