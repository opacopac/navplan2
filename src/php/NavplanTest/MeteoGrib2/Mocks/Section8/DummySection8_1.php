<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section8;


class DummySection8_1 {
    public static function createData(): string {
        return pack("a4","7777");
    }
}
