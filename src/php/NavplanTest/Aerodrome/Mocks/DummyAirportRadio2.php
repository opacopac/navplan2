<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\Mocks;

use Navplan\Aerodrome\DomainModel\AirportRadio;


class DummyAirportRadio2 {
    public static function create(): AirportRadio {
        return new AirportRadio(
            "COMMUNICATION",
            "123.400",
            "GLIDING",
            NULL,
            "Bern GLD"
        );
    }


    public static function createDbResult(): array {
        return array(
            "airport_id" => 22203,
            "category" => "COMMUNICATION",
            "frequency" => "123.400",
            "type" => "GLIDING",
            "typespec" => NULL,
            "description" => "Bern GLD"
        );
    }


    public static function createRest(): array {
        return array(
            "category" => "COMMUNICATION",
            "frequency" => "123.400",
            "type" => "GLIDING",
            "typespec" => NULL,
            "description" => "Bern GLD",
        );
    }
}
