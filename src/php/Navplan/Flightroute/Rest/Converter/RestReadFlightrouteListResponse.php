<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;


class RestReadFlightrouteListResponse {
    public function __construct(public array $flightrouteList) {
    }


    public function toRest(): array  {
        return array(
            "navplanList" => array_map(
                function ($flightroute) { return RestFlightrouteConverter::toRestShort($flightroute); },
                $this->flightrouteList
            )
        );
    }
}
