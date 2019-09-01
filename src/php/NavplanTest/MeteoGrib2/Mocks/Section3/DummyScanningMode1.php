<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ScanningMode;


class DummyScanningMode1 {
    public static function create(): ScanningMode {
        return new ScanningMode(true, true, true, true, false, false, false, true);
    }


    public static function createValue(): int {
        return 0b01000000;
    }
}
