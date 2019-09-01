<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ResolutionAndComponentFlags;


class ResolutionAndComponentFlagsParser {
    public static function parse(int $value): ResolutionAndComponentFlags {
        return new ResolutionAndComponentFlags(
            ($value & 0b00100000) !== 0,
            ($value & 0b00010000) !== 0,
            ($value & 0b00001000) === 0
        );
    }
}
