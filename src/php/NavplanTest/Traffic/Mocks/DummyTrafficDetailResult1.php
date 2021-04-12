<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;


class DummyTrafficDetailResult1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress("4B3142", TrafficAddressType::ICAO),
            "HB-SRA",
            "AT-3 R100",
            "AERO AT SP. Z O.O.",
            "AAT3",
            "L",
            "P"
        );
    }


    public static function createRest(): array {
        return array(
            "addr" => ["4B3142", "ICAO"],
            "reg" => "HB-SRA",
            "model" => "AT-3 R100",
            "manufacturer" => "AERO AT SP. Z O.O.",
            "ac_type" => "AAT3",
            "ac_class" => "L",
            "eng_class" => "P"
        );
    }
}
