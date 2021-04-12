<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;


class DummyBasestationTrafficDetail1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress("4B3142", TrafficAddressType::ICAO),
            "HB-SRA",
            NULL,
            "AERO 3",
            "AAT3",
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            'mode_s' => '4B3142',
            'registration' => 'HB-SRA',
            'manufacturer' => 'AERO 3',
            'icao_type_code' => 'AAT3'
        );
    }
}
