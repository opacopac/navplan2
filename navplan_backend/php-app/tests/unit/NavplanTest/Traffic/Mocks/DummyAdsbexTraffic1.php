<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficAdsbex;


class DummyAdsbexTraffic1 {
    public static function create(): TrafficAdsbex {
        return new TrafficAdsbex(
            new TrafficAddress("4B3145", TrafficAddressType::ICAO),
            "AAT3",
            "HB-SRD",
            "HBSRD",
            NULL,
            [ DummyAdsbexTrafficPosition1::create() ]
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B3145", "ICAO"],
            "icaotype" => "AAT3",
            "reg" => "HB-SRD",
            "call" => "HBSRD",
            "opicao" => NULL,
            "poslist" => [ DummyAdsbexTrafficPosition1::createRest() ],
        );
    }
}
