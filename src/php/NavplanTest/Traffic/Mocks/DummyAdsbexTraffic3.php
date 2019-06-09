<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic3 {
    public static function create(): Traffic {
        return new Traffic(
            "4BAA8F",
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            "A321",
            "TC-JTO",
            "THY4PF",
            "THY",
            NULL,
            [ DummyAdsbexTrafficPosition3::create() ]
        );
    }
}
