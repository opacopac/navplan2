<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use DateTime;
use Navplan\MeteoGrib2\Domain\Section1\ReferenceTime;


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
            new DateTime('@' . mktime(
                $hourValue,
                $minValue,
                $secValue,
                $monthValue,
                $dayValue,
                $yearValue
            ))
        );
    }
}
