<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;


class DummyLfrchTrafficDetail1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress("4B3142", TrafficAddressType::ICAO),
            "HB-SRA",
            "AT-3 R100",
            "AERO AT SP. Z O.O.",
            NULL,
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            'icaohex' => '4B3142',
            'registration' => 'HB-SRA',
            'aircraftModelType' => 'AT-3 R100',
            'manufacturer' => 'AERO AT SP. Z O.O.'
        );
    }
}
