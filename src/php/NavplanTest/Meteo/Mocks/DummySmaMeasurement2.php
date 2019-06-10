<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Mocks;

use Navplan\Geometry\Domain\Timestamp;
use Navplan\Meteo\Domain\SmaMeasurement;


class DummySmaMeasurement2
{
    public static function create(): SmaMeasurement {
        return new SmaMeasurement(
            DummySmaStation2::create(),
            Timestamp::fromS(1560199800),
            NULL,
            NULL,
            0.3,
            152,
            1.8,
            5.8,
            1015.5,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array_merge(
            DummySmaStation2::createDbResult(),
            array(
                "measurement_time" => "2019-06-10 20:50:00",
                "temp_c" => NULL,
                "sun_min" => NULL,
                "precip_mm" => 0.3,
                "wind_dir" => 152,
                "wind_speed_kmh" => 1.8,
                "wind_gusts_kmh" => 5.8,
                "qnh_hpa" => 1015.5,
                "humidity_pc" => NULL
            )
        );
    }
}
