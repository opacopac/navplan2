<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\Domain\AirportRadio;


class DummyAirportRadio1 {
    public static function create(): AirportRadio {
        return new AirportRadio(
            "COMMUNICATION",
            "121.025",
            "TOWER",
            NULL,
            "Bern TWR/VDF"
        );
    }


    public static function createDbResult(): array {
        return array(
            "airport_id" => 22203,
            "category" => "COMMUNICATION",
            "frequency" => "121.025",
            "type" => "TOWER",
            "typespec" => NULL,
            "description" => "Bern TWR/VDF"
        );
    }


    public static function createRest(): array {
        return array(
            "category" => "COMMUNICATION",
            "frequency" => "121.025",
            "type" => "TOWER",
            "typespec" => NULL,
            "description" => "Bern TWR/VDF",
        );
    }
}
