<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Meteo\Domain\SmaStation;


class DummySmaStation2 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BEZ",
            "Beznau",
            new Position2d(8.23325, 47.5572),
            new Altitude(325, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createDbResult(): array {
        return array(
            "station_id" => "BEZ",
            "station_name" => "Beznau",
            "station_lat" => 47.5572,
            "station_lon" => 8.23325,
            "station_alt_m" => 325
        );
    }
}
