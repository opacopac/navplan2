<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class DummyOgnTraffic5 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress("4B05D7", TrafficAddressType::ICAO),
            TrafficAcType::POWERED_AIRCRAFT,
            [ DummyOgnTrafficPosition5::create() ]
        );
    }
}
