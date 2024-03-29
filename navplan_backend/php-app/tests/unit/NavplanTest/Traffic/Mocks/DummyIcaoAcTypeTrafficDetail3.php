<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Model\TrafficDetail;


class DummyIcaoAcTypeTrafficDetail3 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            "A-320",
            "AIRBUS",
            "A320",
            "L",
            "J"
        );
    }


    public static function createDbResult(): array {
        return array(
            'designator' => 'A320',
            'model' => 'A-320',
            'manufacturer' => 'AIRBUS',
            'ac_type' => 'L',
            'eng_type' => 'J'
        );
    }
}
