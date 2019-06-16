<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAddressType;
use Navplan\Traffic\Domain\TrafficOgn;


class DummyOgnTraffic1 {
    public static function create(): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress(
            "4B05D7",
            TrafficAddressType::ICAO
            ),
            TrafficAcType::POWERED_AIRCRAFT,
            [ DummyOgnTrafficPosition1::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "address" => ["4B05D7", "ICAO"],
            "actype" => "POWERED_AIRCRAFT",
            "poslist" => [ DummyOgnTrafficPosition1::createRest() ],
        );
    }
}
