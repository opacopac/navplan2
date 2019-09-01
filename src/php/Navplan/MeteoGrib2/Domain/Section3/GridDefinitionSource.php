<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;

use Navplan\Shared\Enum;

// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-0.shtml
class GridDefinitionSource extends Enum {
    const UNKNOWN = 0;
    const TEMPLATE = 1;
    const PREDETERMINED = 2;
    const NONE = 999;

    const __default = self::UNKNOWN;
}
