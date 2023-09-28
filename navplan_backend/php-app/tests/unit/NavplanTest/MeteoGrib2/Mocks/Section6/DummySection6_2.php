<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section6;

use Navplan\MeteoGrib2\Domain\Section6\BitmapSection;


class DummySection6_2 {
    public static function create(): BitmapSection {
        return new BitmapSection(
            0,
            [
                0b10110100,
                0b00011101
            ]
        );
    }


    public static function createData(): string {
        return pack("CCC",0, 0b10110100, 0b00011101);
    }
}
