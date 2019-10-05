<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section7;

use Navplan\MeteoGrib2\Domain\Section7\DataSection;


class DummySection7_1 {
    public static function create(): DataSection {
        return new DataSection(
            [(53400.0 + 0b10110100101) / 10, (53400 + 0b10110100101) / 10]
        );
    }


    public static function createData(): string {
        return pack("CCC",0b10110100, 0b10110110, 0b10010100);
    }
}
