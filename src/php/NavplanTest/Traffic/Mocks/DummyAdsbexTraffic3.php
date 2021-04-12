<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficAdsbex;


class DummyAdsbexTraffic3 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            new TrafficAddress("4BAA8F", TrafficAddressType::ICAO),
            "A321",
            "TC-JTO",
            "THY4PF",
            "THY",
            [ DummyAdsbexTrafficPosition3::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4BAA8F", "ICAO"],
            "icaotype" => "A321",
            "reg" => "TC-JTO",
            "call" => "THY4PF",
            "opicao" => "THY",
            "poslist" => [ DummyAdsbexTrafficPosition3::createRest() ],
        );
    }
}
