<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic3 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress("4B2928", TrafficAddressType::ICAO),
            TrafficAcType::POWERED_AIRCRAFT,
            [ DummyOgnTrafficPosition3::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B2928", "ICAO"],
            "actype" => "POWERED_AIRCRAFT",
            "poslist" => [ DummyOgnTrafficPosition3::createRest() ],
        );
    }
}
