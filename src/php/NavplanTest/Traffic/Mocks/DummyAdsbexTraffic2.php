<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic2 {
    public static function create(): Traffic {
        return new Traffic(
            "4B2928",
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            "P28A",
            "HB-PPG",
            "HBPPG",
            NULL,
            NULL,
            [ DummyAdsbexTrafficPosition2::create() ]
        );
    }
}
