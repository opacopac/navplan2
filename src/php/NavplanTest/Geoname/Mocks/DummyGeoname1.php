<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\Domain\Geoname;


class DummyGeoname1 {
    public static function create(): Geoname {
        return new Geoname(
            2661552,
            "Bern",
            "Bern",
            "P",
            "PPLC",
            "CH",
            "BE",
            "246",
            121631,
            new Position2d(7.44744,46.9481),
            new Altitude(0, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createDbResult(): array {
        return array(
            "geonameid" => 2661552,
            "name" => "Bern",
            "searchresultname" => "Bern",
            "feature_class" => "P",
            "feature_code" => "PPLC",
            "country" => "CH",
            "admin1" => "BE",
            "admin2" => "246",
            "population" => 121631,
            "latitude" => 46.7775,
            "longitude" => 7.44744,
            "elevation" => 0
        );
    }
}
