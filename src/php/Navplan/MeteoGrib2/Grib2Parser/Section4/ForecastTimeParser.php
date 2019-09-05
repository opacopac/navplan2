<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use DateInterval;
use InvalidArgumentException;

// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table4-4.shtml
class ForecastTimeParser {
    public static function parse(int $unit, int $value): ?DateInterval {
        $dateTimeSpec = self::getSpec($unit, $value);
        if ($dateTimeSpec != NULL) {
            return new DateInterval("P" . self::getSpec($unit, $value));
        } else {
            return NULL;
        }
    }


    private static function getSpec(int $unit, int $value): ?string {
        switch ($unit) {
            case 0: return "T" . $value . "M";
            case 1: return "T" . $value . "H";
            case 2: return $value . "D";
            case 3: return $value . "M";
            case 4: return $value . "Y";
            case 5: return (10 * $value) . "Y";
            case 6: return (30 * $value) . "Y";
            case 7: return (100 * $value) . "Y";
            case 10: return "T" . (3 * $value) . "H";
            case 11: return "T" . (6 * $value) . "H";
            case 12: return "T" . (12 * $value) . "H";
            case 13: return "T" . $value . "S";
            case 255: return NULL;
            default: throw new InvalidArgumentException('time units of number ' . $unit . ' are not supported');
        }
    }
}
