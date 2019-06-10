<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Mocks;

use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\Timestamp;
use Navplan\Geometry\Domain\TimeUnit;
use Navplan\Meteo\Domain\SmaMeasurement;


class DummySmaMeasurement1
{
    public static function create(): SmaMeasurement {
        return new SmaMeasurement(
            DummySmaStation1::create(),
            Timestamp::fromS(1560199800),
            13.2,
            new Time(0, TimeUnit::MIN),
            0.5,
            179,
            8.3,
            12.6,
            1014.9,
            93
        );
    }


    public static function createDbResult(): array {
        return array_merge(
            DummySmaStation1::createDbResult(),
            array(
                "measurement_time" => "2019-06-10 20:50:00",
                "temp_c" => 13.2,
                "sun_min" => 0,
                "precip_mm" => 0.5,
                "wind_dir" => 179,
                "wind_speed_kmh" => 8.3,
                "wind_gusts_kmh" => 12.6,
                "qnh_hpa" => 1014.9,
                "humidity_pc" => 93
            )
        );
    }
}
