<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyOgnTraffic2 {
    public static function create(): Traffic {
        return new Traffic(
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
}
