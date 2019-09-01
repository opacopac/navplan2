<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest;

use Navplan\MeteoSma\Domain\ReadSmaMeasurementsResponse;
use Navplan\MeteoSma\Domain\SmaMeasurement;


class RestSmaMeasurementsResponse {
    public static function toRest(ReadSmaMeasurementsResponse $response): array {
        return array(
            "smameasurements" => array_map(
                function (SmaMeasurement $measurement) { return RestSmaMeasurement::toRest($measurement); },
                $response->smaMeasurementList
            )
        );
    }
}
