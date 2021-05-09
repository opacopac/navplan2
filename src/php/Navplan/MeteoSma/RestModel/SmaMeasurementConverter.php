<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\Common\RestModel\RestTimeConverter;
use Navplan\Common\RestModel\RestTimestampConverter;
use Navplan\MeteoSma\DomainModel\SmaMeasurement;


class SmaMeasurementConverter {
    public static function toRest(SmaMeasurement $measurement): array {
        return array(
            "station" => SmaStationConverter::toRest($measurement->station),
            "measurement_time" => RestTimestampConverter::toRest($measurement->timestamp),
			"temp_c" => $measurement->temperatureC,
			"sun_min" => $measurement->sunTime ? RestTimeConverter::toRest($measurement->sunTime) : NULL,
			"precip_mm" => $measurement->precipMm,
			"wind_dir" => $measurement->windDir,
			"wind_speed_kmh" => $measurement->windSpeedKmh, // TODO
			"wind_gusts_kmh" => $measurement->windGustsKmh, // TODO
			"qnh_hpa" => $measurement->qnhHpa,
			"humidity_pc" => $measurement->humitidyProc
        );
    }
}
