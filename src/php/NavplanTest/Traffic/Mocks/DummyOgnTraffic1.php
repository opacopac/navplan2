<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic1 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            "4B05D7",
            TrafficAddressType::ICAO,
            TrafficAcType::POWERED_AIRCRAFT,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            [ DummyOgnTrafficPosition1::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "acaddress" => "4B05D7",
            "addresstype" => "ICAO",
            "actype" => "POWERED_AIRCRAFT",
            "icaotype" => NULL,
            "registration" => NULL,
            "callsign" => NULL,
            "opicao" => NULL,
            "acmodel" => NULL,
            "poslist" => [ DummyOgnTrafficPosition1::createRest() ],
        );
    }
}
