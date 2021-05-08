<?php declare(strict_types=1);

namespace NavplanTest\Airport\Mocks;

use Navplan\Airport\DomainModel\AirportFeature;


class DummyAirportFeature1 {
    public static function create(): AirportFeature {
        return new AirportFeature(
            "PARACHUTE",
            "",
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "type" => "PARACHUTE",
            "name" => "",
            "airport_icao" => "LSZB",
            "latitude" => NULL,
            "longitude" => NULL
        );
    }


    public static function createRest(): array {
        return array(
            "type" => "PARACHUTE",
            "name" => "",
            "pos" => NULL
        );
    }
}