<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic1 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            "4B3145",
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            "AAT3",
            "HB-SRD",
            "HBSRD",
            NULL,
            NULL,
            [ DummyAdsbexTrafficPosition1::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "acaddress" => "4B3145",
            "addresstype" => "ICAO",
            "actype" => "UNKNOWN",
            "icaotype" => "AAT3",
            "registration" => "HB-SRD",
            "callsign" => "HBSRD",
            "opicao" => NULL,
            "acmodel" => NULL,
            "poslist" => [ DummyAdsbexTrafficPosition1::createRest() ],
        );
    }
}
