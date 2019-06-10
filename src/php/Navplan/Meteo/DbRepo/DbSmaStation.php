<?php declare(strict_types=1);

namespace Navplan\Meteo\DbRepo;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Meteo\Domain\SmaStation;


class DbSmaStation {
    public static function fromDbResult(array $rs): SmaStation {
        return new SmaStation(
            $rs["station_id"],
            $rs["station_name"],
            self::getPosition($rs),
            self::getAltitude($rs)
        );
    }


    private static function getPosition(array $rs): Position2d {
        return new Position2d(
            floatval($rs["station_lon"]),
            floatval($rs["station_lat"])
        );
    }


    private static function getAltitude(array $rs): Altitude {
        return new Altitude(
            intval($rs["station_alt_m"]),
            AltitudeUnit::M,
            AltitudeReference::MSL
        );
    }
}
