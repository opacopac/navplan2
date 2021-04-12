<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geoname\DomainModel\Geoname;


class DummyGeoname2 {
    public static function create(): Geoname {
        return new Geoname(
            2657986,
            "Wildstrubel",
            "Wildstrubel",
            "T",
            "MT",
            "CH",
            "BE",
            "248",
            0,
            new Position2d(7.5286,46.4003),
            new Altitude(3244, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createDbResult(): array {
        return array(
            "geonameid" => 2657986,
            "name" => "Wildstrubel",
            "searchresultname" => "Wildstrubel",
            "feature_class" => "T",
            "feature_code" => "MT",
            "country" => "CH",
            "admin1" => "BE",
            "admin2" => "248",
            "population" => 0,
            "latitude" => 46.4003,
            "longitude" => 7.5286,
            "elevation" => 3244
        );
    }
}
