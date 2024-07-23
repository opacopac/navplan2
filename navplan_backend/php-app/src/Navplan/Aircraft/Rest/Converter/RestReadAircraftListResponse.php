<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;


class RestReadAircraftListResponse {
    public function __construct(public array $aircraftList) {
    }


    public function toRest(): array  {
        return array(
            "aircraftList" => array_map(
                function ($aircraft) { return RestAircraftConverter::toRestShort($aircraft); },
                $this->aircraftList
            )
        );
    }
}
