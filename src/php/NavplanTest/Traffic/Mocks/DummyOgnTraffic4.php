<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic4 {
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
            [ DummyOgnTrafficPosition4::create() ]
        );
    }
}
