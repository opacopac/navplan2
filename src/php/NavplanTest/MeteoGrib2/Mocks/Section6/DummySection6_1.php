<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section6;

use Navplan\MeteoGrib2\Domain\Section6\BitmapSection;


class DummySection6_1 {
    public static function create(): BitmapSection {
        return new BitmapSection(
            255,
            NULL
        );
    }


    public static function createData(): string {
        return pack("C",255);
    }
}
