<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\MeteoSma\DomainModel\SmaMeasurement;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsResponse;


class SmaMeasurementsResponseConverter {
    public static function toRest(ReadSmaMeasurementsResponse $response): array {
        return array(
            "smameasurements" => array_map(
                function (SmaMeasurement $measurement) { return SmaMeasurementConverter::toRest($measurement); },
                $response->smaMeasurementList
            )
        );
    }
}
