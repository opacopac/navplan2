<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use DateInterval;


class HoursMinutesParser {
    public static function parse(
        int $hours,
        int $minutes
    ): DateInterval {
        return new DateInterval("PT" . $hours . "H" . $minutes . "M");
    }
}
