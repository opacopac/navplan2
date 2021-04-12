<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficDetail;


class DummyIcaoAcTypeTrafficDetail2 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            "A-320 Prestige",
            "AIRBUS",
            "A320",
            "L",
            "J"
        );
    }


    public static function createDbResult(): array {
        return array(
            'designator' => 'A320',
            'model' => 'A-320 Prestige',
            'manufacturer' => 'AIRBUS',
            'ac_type' => 'L',
            'eng_type' => 'J'
        );
    }
}
