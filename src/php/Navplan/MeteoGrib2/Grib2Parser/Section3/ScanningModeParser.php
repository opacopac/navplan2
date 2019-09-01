<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ScanningMode;


class ScanningModeParser {
    public static function parse(int $value): ScanningMode {
        return new ScanningMode(
            ($value & 0b10000000) === 0,
            ($value & 0b01000000) !== 0,
            ($value & 0b00100000) === 0,
            ($value & 0b00010000) === 0,
            ($value & 0b00001000) !== 0,
            ($value & 0b00000100) !== 0,
            ($value & 0b00000010) !== 0,
            ($value & 0b00000001) === 0
        );
    }
}
