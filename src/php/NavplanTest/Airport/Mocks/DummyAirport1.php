<?php declare(strict_types=1);

namespace NavplanTest\Airport\Mocks;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use NavplanTest\Webcam\Mocks\DummyWebcam1;


class DummyAirport1 {
    public static function create(): Airport {
        return new Airport(
            22203,
            "INTL_APT",
            "BERN-BELP",
            "LSZB",
            "CH",
            new Position2d(7.4991705, 46.9122005),
            new Length(510, LengthUnit::M),
            [DummyAirportRunway1::create(), DummyAirportRunway2::create()],
            [DummyAirportRadio1::create(), DummyAirportRadio2::create()],
            [DummyWebcam1::create()],
            [],
            [DummyAirportFeature1::create()]
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 22203,
            "type" => "INTL_APT",
            "name" => "BERN-BELP",
            "icao" => "LSZB",
            "country" => "CH",
            "latitude" => 46.9122005,
            "longitude" => 7.4991705,
            "elevation" => 510,
        );
    }


    public static function createRest(): array {
        return array(
            "id" => 22203,
            "type" => "INTL_APT",
            "name" => "BERN-BELP",
            "icao" => "LSZB",
            "country" => "CH",
            "pos" => [7.499171, 46.912201],
            "elevation" => [510, "M"],
            "runways" => [DummyAirportRunway1::createRest(), DummyAirportRunway2::createRest()],
            "radios" => [DummyAirportRadio1::createRest(), DummyAirportRadio2::createRest()],
            "webcams" => [DummyWebcam1::createRest()],
            "charts" => [],
            "mapfeatures" => [DummyAirportFeature1::createRest()]
        );
    }
}
