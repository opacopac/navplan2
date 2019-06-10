<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic1 {
    public static function create(): Traffic {
        return new Traffic(
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
            "acAddress" => "4B3145",
            "addressType" => "ICAO",
            "acType" => "UNKNOWN",
            "icaoType" => "AAT3",
            "registration" => "HB-SRD",
            "callsign" => "HBSRD",
            "opIcao" => NULL,
            "acModel" => NULL,
            "positionList" => [ DummyAdsbexTrafficPosition1::createRest() ],
        );
    }
}
