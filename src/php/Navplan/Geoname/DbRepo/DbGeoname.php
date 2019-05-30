<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\Domain\Geoname;


class DbGeoname {
    public static function fromDbResult(array $rs): Geoname {
        return new Geoname(
            intval($rs["geonameid"]),
            $rs["name"],
            $rs["searchresultname"],
            $rs["feature_class"],
            $rs["feature_code"],
            $rs["country"],
            $rs["admin1"],
            $rs["admin2"],
            intval($rs["population"]),
            new Position2d(floatval($rs["longitude"]), floatval($rs["latitude"])),
            intval($rs["elevation"]) // $this->getTerrainHelper()->getElevationMeters([$rs["longitude"], $rs["latitude"]])
        );
    }
}
