<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic3 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            "4BAA8F",
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            "A321",
            "TC-JTO",
            "THY4PF",
            "THY",
            NULL,
            [ DummyAdsbexTrafficPosition3::create() ]
        );
    }




    public static function createRest(): array {
        return array(
            "acaddress" => "4BAA8F",
            "addresstype" => "ICAO",
            "actype" => "UNKNOWN",
            "icaotype" => "A321",
            "registration" => "TC-JTO",
            "callsign" => "THY4PF",
            "opicao" => "THY",
            "acmodel" => NULL,
            "poslist" => [ DummyAdsbexTrafficPosition3::createRest() ],
        );
    }
}
