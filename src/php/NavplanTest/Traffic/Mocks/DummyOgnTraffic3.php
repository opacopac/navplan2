<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic3 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            "4B2928",
            TrafficAddressType::ICAO,
            TrafficAcType::POWERED_AIRCRAFT,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            [ DummyOgnTrafficPosition3::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "acaddress" => "4B2928",
            "addresstype" => "ICAO",
            "actype" => "POWERED_AIRCRAFT",
            "icaotype" => NULL,
            "registration" => NULL,
            "callsign" => NULL,
            "opicao" => NULL,
            "acmodel" => NULL,
            "poslist" => [ DummyOgnTrafficPosition3::createRest() ],
        );
    }
}
