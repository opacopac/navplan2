<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic4 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress(
            "4B2928",
            TrafficAddressType::ICAO
            ),
            TrafficAcType::POWERED_AIRCRAFT,
            [ DummyOgnTrafficPosition4::create() ]
        );
    }
}
