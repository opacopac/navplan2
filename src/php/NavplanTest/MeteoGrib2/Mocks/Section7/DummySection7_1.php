<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section7;

use Navplan\MeteoGrib2\Domain\Section7\Section7;


class DummySection7_1 {
    public static function create(): Section7 {
        return new Section7(
            [(53400.0 + 0b10110100101) / 10, (53400 + 0b10110100101) / 10]
        );
    }


    public static function createData(): string {
        return pack("NCCCC",8,7, 0b10110100, 0b10110110, 0b10010100);
    }
}
