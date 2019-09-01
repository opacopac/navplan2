<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section0;

use Navplan\Shared\Enum;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table0-0.shtml
class Discipline extends Enum {
    const UNKNOWN = 0;
    const METEOROLOGICAL_PRODUCTS = 1;
    const HYDROLOGICAL_PRODUCTS = 2;
    const LAND_SURFACE_PRODUCTS = 3;
    const SPACE_PRODUCTS = 4;
    const SPACE_WEATHER_PRODUCTS = 5;
    const OCEANOGRAPHIC_PRODUCTS = 6;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
