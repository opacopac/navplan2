<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section8;

use Navplan\MeteoGrib2\Domain\Section8\EndSection;


class DummySection8_1 {
    public static function create(): EndSection {
        return new EndSection();
    }

    public static function createData(): string {
        return '';
    }
}
