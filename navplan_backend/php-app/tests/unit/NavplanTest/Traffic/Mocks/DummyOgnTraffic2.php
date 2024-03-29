<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Model\TrafficAcType;
use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficOgn;


class DummyOgnTraffic2 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress("4B1A91", TrafficAddressType::ICAO),
            TrafficAcType::TOW_PLANE,
            [ DummyOgnTrafficPosition2::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B1A91", "ICAO"],
            "actype" => "TOW_PLANE",
            "poslist" => [ DummyOgnTrafficPosition2::createRest() ],
        );
    }
}
