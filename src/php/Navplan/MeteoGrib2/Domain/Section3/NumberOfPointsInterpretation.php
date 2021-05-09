<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;

use Navplan\Common\Enum;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-11.shtml
class NumberOfPointsInterpretation extends Enum {
    const UNKNOWN = 0;
    const NO_LIST = 1;
    const FULL_COORDINATE_CIRCLES = 2;
    const EXTREME_COORDINATE_VALUES = 2;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
