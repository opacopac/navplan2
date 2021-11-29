<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;


class RestReadSmaMeasurementsResponse {
    public function __construct(public array $smaMeasurementList) {
    }


    public function toRest(): array {
        return array(
            "smameasurements" => RestSmaMeasurementConverter::toRestList($this->smaMeasurementList)
        );
    }
}
