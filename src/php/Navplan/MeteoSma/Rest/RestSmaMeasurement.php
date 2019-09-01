<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest;

use Navplan\Geometry\Rest\RestTime;
use Navplan\Geometry\Rest\RestTimestamp;
use Navplan\MeteoSma\Domain\SmaMeasurement;


class RestSmaMeasurement {
    public static function toRest(SmaMeasurement $measurement): array {
        return array(
            "station" => RestSmaStation::toRest($measurement->station),
            "measurement_time" => RestTimestamp::toRest($measurement->timestamp),
			"temp_c" => $measurement->temperatureC,
			"sun_min" => $measurement->sunTime ? RestTime::toRest($measurement->sunTime) : NULL,
			"precip_mm" => $measurement->precipMm,
			"wind_dir" => $measurement->windDir,
			"wind_speed_kmh" => $measurement->windSpeedKmh, // TODO
			"wind_gusts_kmh" => $measurement->windGustsKmh, // TODO
			"qnh_hpa" => $measurement->qnhHpa,
			"humidity_pc" => $measurement->humitidyProc
        );
    }
}
