<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\DomainModel\MapFeature;


class DummyMapFeature1 {
    public static function create(): MapFeature {
        return new MapFeature(
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
