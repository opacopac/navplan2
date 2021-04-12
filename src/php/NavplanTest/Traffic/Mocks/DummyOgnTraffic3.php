<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class DummyOgnTraffic3 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress("4B2928", TrafficAddressType::ICAO),
            TrafficAcType::POWERED_AIRCRAFT,
            [ DummyOgnTrafficPosition3::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B2928", "ICAO"],
            "actype" => "POWERED_AIRCRAFT",
            "poslist" => [ DummyOgnTrafficPosition3::createRest() ],
        );
    }
}
