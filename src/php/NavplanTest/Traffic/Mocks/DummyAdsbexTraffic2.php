<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAddressType;


class DummyAdsbexTraffic2 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            new TrafficAddress(
                "4B2928",
                TrafficAddressType::ICAO
            ),
            "P28A",
            "HB-PPG",
            "HBPPG",
            NULL,
            [ DummyAdsbexTrafficPosition2::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B2928", "ICAO"],
            "icaotype" => "P28A",
            "reg" => "HB-PPG",
            "call" => "HBPPG",
            "opicao" => NULL,
            "poslist" => [ DummyAdsbexTrafficPosition2::createRest() ],
        );
    }
}
