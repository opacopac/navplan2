<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ResolutionAndComponentFlags;


class DummyResolutionAndComponentFlags1 {
    public static function create(): ResolutionAndComponentFlags {
        return new ResolutionAndComponentFlags(false, false, true);
    }


    public static function createValue(): int {
        return 0b00000000;
    }
}
