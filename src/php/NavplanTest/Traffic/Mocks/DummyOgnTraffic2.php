<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic2 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            "4B1A91",
            TrafficAddressType::ICAO,
            TrafficAcType::TOW_PLANE,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            [ DummyOgnTrafficPosition2::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "acaddress" => "4B1A91",
            "addresstype" => "ICAO",
            "actype" => "TOW_PLANE",
            "icaotype" => NULL,
            "registration" => NULL,
            "callsign" => NULL,
            "opicao" => NULL,
            "acmodel" => NULL,
            "poslist" => [ DummyOgnTrafficPosition2::createRest() ],
        );
    }
}
