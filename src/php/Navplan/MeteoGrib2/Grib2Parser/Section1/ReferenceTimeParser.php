<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ReferenceTime;
use Navplan\MeteoGrib2\Grib2Parser\DateTimeParser;


class ReferenceTimeParser {
    public static function parse(
        int $significanceValue,
        int $yearValue,
        int $monthValue,
        int $dayValue,
        int $hourValue,
        int $minValue,
        int $secValue
    ): ReferenceTime {
        return new ReferenceTime(
            ReferenceTimeSignificanceParser::parse($significanceValue),
            DateTimeParser::parse($yearValue, $monthValue, $dayValue, $hourValue, $minValue, $secValue)
        );
    }
}
