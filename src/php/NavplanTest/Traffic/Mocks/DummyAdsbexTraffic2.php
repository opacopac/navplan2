<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic2 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            "4B2928",
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            "P28A",
            "HB-PPG",
            "HBPPG",
            NULL,
            NULL,
            [ DummyAdsbexTrafficPosition2::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "acaddress" => "4B2928",
            "addresstype" => "ICAO",
            "actype" => "UNKNOWN",
            "icaotype" => "P28A",
            "registration" => "HB-PPG",
            "callsign" => "HBPPG",
            "opicao" => NULL,
            "acmodel" => NULL,
            "poslist" => [ DummyAdsbexTrafficPosition2::createRest() ],
        );
    }
}
