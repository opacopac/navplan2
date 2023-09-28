<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ProjectionCenter;


class DummyProjectionCenter1 {
    public static function create(): ProjectionCenter {
        return new ProjectionCenter(true, false);
    }


    public static function createValue(): int {
        return 0b00000000;
    }
}
