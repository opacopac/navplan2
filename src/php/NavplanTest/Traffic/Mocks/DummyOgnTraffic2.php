<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


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
