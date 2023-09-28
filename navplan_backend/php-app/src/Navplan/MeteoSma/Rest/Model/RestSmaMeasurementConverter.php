<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Model;

use Navplan\Common\Rest\Converter\RestTimeConverter;
use Navplan\Common\Rest\Converter\RestTimestampConverter;
use Navplan\MeteoSma\Domain\Model\SmaMeasurement;


class RestSmaMeasurementConverter {
    public static function toRest(SmaMeasurement $measurement): array {
        return array(
            "station" => RestSmaStationConverter::toRest($measurement->station),
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


    /**
     * @param SmaMeasurement[] $measurementList
     * @return array
     */
    public static function toRestList(array $measurementList): array {
        return array_map(
            function (SmaMeasurement $measurement) { return self::toRest($measurement); },
            $measurementList
        );
    }
}
