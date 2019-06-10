<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyOgnTraffic1 {
    public static function create(): Traffic {
        return new Traffic(
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
            "acAddress" => "4B05D7",
            "addressType" => "ICAO",
            "acType" => "POWERED_AIRCRAFT",
            "icaoType" => NULL,
            "registration" => NULL,
            "callsign" => NULL,
            "opIcao" => NULL,
            "acModel" => NULL,
            "positionList" => [ DummyOgnTrafficPosition1::createRest() ],
        );
    }
}
