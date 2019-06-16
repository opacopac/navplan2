<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic5 {
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
            [ DummyOgnTrafficPosition5::create() ]
        );
    }
}
