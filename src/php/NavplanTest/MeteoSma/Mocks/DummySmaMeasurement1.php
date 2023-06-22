<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\MeteoSma\Domain\Model\SmaMeasurement;


class DummySmaMeasurement1
{
    public static function create(): SmaMeasurement {
        return new SmaMeasurement(
            DummySmaStation1::create(),
            Timestamp::fromS(1560199800),
            13.2,
            new Time(0, TimeUnit::M),
            0.5,
            179,
            8.3,
            12.6,
            1014.9,
            93
        );
    }


    public static function createDbResult(): array {
        $station = DummySmaStation1::create();
        return array(
            "station_id" => $station->id,
            "station_name" => $station->name,
            "station_lat" => $station->position->latitude,
            "station_lon" => $station->position->longitude,
            "station_alt_m" => $station->altitude->value,
            "measurement_time" => "2019-06-10 20:50:00",
            "temp_c" => 13.2,
            "sun_min" => 0,
            "precip_mm" => 0.5,
            "wind_dir" => 179,
            "wind_speed_kmh" => 8.3,
            "wind_gusts_kmh" => 12.6,
            "qnh_hpa" => 1014.9,
            "humidity_pc" => 93
        );
    }


    public static function createRest(): array {
        return array(
            "station" => DummySmaStation1::createRest(),
            "measurement_time" => 1560199800000,
            "temp_c" => 13.2,
            "sun_min" => [0, "M"],
            "precip_mm" => 0.5,
            "wind_dir" => 179,
            "wind_speed_kmh" => 8.3,
            "wind_gusts_kmh" => 12.6,
            "qnh_hpa" => 1014.9,
            "humidity_pc" => 93
        );
    }
}
