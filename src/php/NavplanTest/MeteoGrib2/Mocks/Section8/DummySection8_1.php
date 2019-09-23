<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section8;

use Navplan\MeteoGrib2\Domain\Section8\Section8;


class DummySection8_1 {
    public static function create(): Section8 {
        return new Section8();
    }

    public static function createData(): string {
        return '';
    }
}
