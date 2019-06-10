<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Meteo\Domain\SmaStation;


class DummySmaStation1 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BER",
            "Bern / Zollikofen",
            new Position2d(7.464, 46.9907),
            new Altitude(552, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createDbResult(): array {
        return array(
            "station_id" => "BER",
            "station_name" => "Bern / Zollikofen",
            "station_lat" => 46.9907,
            "station_lon" => 7.464,
            "station_alt_m" => 552
        );
    }
}
