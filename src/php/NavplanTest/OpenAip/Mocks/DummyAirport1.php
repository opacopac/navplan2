<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;


use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\Airport;
use Navplan\OpenAip\Domain\AirportRadio;
use Navplan\OpenAip\Domain\AirportRunway;
use Navplan\OpenAip\Domain\MapFeature;
use Navplan\OpenAip\Domain\Webcam;


class DummyAirport1 {
    public static function create(): Airport {
        return new Airport(
            22203,
            "INTL_APT",
            "BERN-BELP",
            "LSZB",
            "CH",
            new Position2d(7.4991705, 46.9122005),
            510,
            [ self::createRunway1(), self::createRunway2() ],
            [ self::createRadio1(), self::createRadio2() ],
            [ self::createWebcam1() ],
            [],
            [ self::createMapFeature1() ]
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


    public static function createRunway1(): AirportRunway {
        return new AirportRunway(
            "14/32",
            "ASPH",
            1730,
            30,
            140,
            320,
            1730,
            1530,
            1530,
            1730,
            true,
            true
        );
    }


    public static function createRunway1DbResult(): array {
        return array(
            "airport_id" => 22203,
            "name" => "14/32",
            "surface" => "ASPH",
            "length" => 1730,
            "width" => 30,
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => 1730,
            "tora2" => 1530,
            "lda1" => 1530,
            "lda2" => 1730,
            "papi1" => 1,
            "papi2" => 1,
        );
    }


    public static function createRunway2(): AirportRunway {
        return new AirportRunway(
            "14R/32L",
            "GRAS",
            650,
            30,
            140,
            320,
            650,
            650,
            650,
            650,
            false,
            false
        );
    }


    public static function createRunway2DbResult(): array {
        return array(
            "airport_id" => 22203,
            "name" => "14R/32L",
            "surface" => "GRAS",
            "length" => 650,
            "width" => 30,
            "direction1" => 140,
            "direction2" => 320,
            "tora1" => 650,
            "tora2" => 650,
            "lda1" => 650,
            "lda2" => 650,
            "papi1" => 0,
            "papi2" => 0,
        );
    }


    public static function createRadio1(): AirportRadio {
        return new AirportRadio(
            "COMMUNICATION",
            "121.025",
            "TOWER",
            NULL,
            "Bern TWR/VDF"
        );
    }


    public static function createRadio1DbResult(): array {
        return array(
            "airport_id" => 22203,
            "category" => "COMMUNICATION",
            "frequency" => "121.025",
            "type" => "TOWER",
            "typespec" => NULL,
            "description" => "Bern TWR/VDF"
        );
    }


    public static function createRadio2(): AirportRadio {
        return new AirportRadio(
            "COMMUNICATION",
            "123.400",
            "GLIDING",
            NULL,
            "Bern GLD"
        );
    }


    public static function createRadio2DbResult(): array {
        return array(
            "airport_id" => 22203,
            "category" => "COMMUNICATION",
            "frequency" => "123.400",
            "type" => "GLIDING",
            "typespec" => NULL,
            "description" => "Bern GLD"
        );
    }


    public static function createWebcam1(): Webcam {
        return new Webcam(
            "Webcam",
            "http://www.flughafenbern.ch/de/erlebnis-flughafen/live/webcam",
            NULL,
            NULL
        );
    }


    public static function createWebcam1DbResult(): array {
        return array(
            "name" => "Webcam",
            "url" => "http://www.flughafenbern.ch/de/erlebnis-flughafen/live/webcam",
            "latitude" => NULL,
            "longitude" => NULL,
            "airport_icao" => "LSZB"
        );
    }


    public static function createMapFeature1(): MapFeature {
        return new MapFeature(
            "PARACHUTE",
            "",
            NULL,
            NULL
        );
    }


    public static function createMapFeature1DbResult(): array {
        return array(
            "type" => "PARACHUTE",
            "name" => "",
            "airport_icao" => "LSZB",
            "latitude" => NULL,
            "longitude" => NULL
        );
    }
}
