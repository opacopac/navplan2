<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficDetail;


class DummyIcaoAcTypeTrafficDetail1 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            "AT-3",
            "AERO 3",
            "AAT3",
            "L",
            "P"
        );
    }


    public static function createDbResult(): array {
        return array(
            'designator' => 'AAT3',
            'model' => 'AT-3',
            'manufacturer' => 'AERO 3',
            'ac_type' => 'L',
            'eng_type' => 'P'
        );
    }

}
