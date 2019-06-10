<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\TrafficDetail;


class DummyIcaoAcTypeTrafficDetail4 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            "A-320 Fantasy",
            "BOEING",
            "A320",
            "L",
            "J"
        );
    }


    public static function createDbResult(): array {
        return array(
            'designator' => 'A320',
            'model' => 'A-320 Fantasy',
            'manufacturer' => 'BOEING',
            'ac_type' => 'L',
            'eng_type' => 'J'
        );
    }
}
