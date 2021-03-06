<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use DateTime;


class DateTimeParser {
    public static function parse(
        int $yearValue,
        int $monthValue,
        int $dayValue,
        int $hourValue,
        int $minValue,
        int $secValue
    ): DateTime {
        return new DateTime(
            '@' . mktime(
                $hourValue,
                $minValue,
                $secValue,
                $monthValue,
                $dayValue,
                $yearValue
            )
        );
    }
}
