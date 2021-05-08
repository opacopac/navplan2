<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geoname\DomainModel\Geoname;


class DbGeonameConverter {
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
            Altitude::fromMtAmsl($rs["elevation"])
        );
    }
}
