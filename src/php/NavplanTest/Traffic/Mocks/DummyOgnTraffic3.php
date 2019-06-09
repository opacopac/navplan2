<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyOgnTraffic3 {
    public static function create(): Traffic {
        return new Traffic(
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
}
