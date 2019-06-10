<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficDetail;


class DummyLfrchTrafficDetail1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            "4B3142",
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
