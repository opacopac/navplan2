<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficDetail;


class DummyBasestationTrafficDetail1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            "4B3142",
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
