<?php declare(strict_types=1);

namespace Navplan\Meteo\Rest;

use Navplan\Meteo\Domain\ReadSmaMeasurementsResponse;
use Navplan\Meteo\Domain\SmaMeasurement;


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
