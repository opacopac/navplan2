<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;

use Navplan\Shared\Enum;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table1-2.shtml
class ReferenceTimeSignificance extends Enum {
    const UNKNOWN = 0;
    const ANALYSIS = 1;
    const START_OF_FORECAST = 2;
    const VERIFYING_TIME_OF_FORECAST = 3;
    const OBSERVATION_TIME = 4;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
