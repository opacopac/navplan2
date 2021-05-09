<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;

use Navplan\Common\Enum;

// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-2.shtml
class EarthShapeType extends Enum {
    const UNKNOWN = 0;
    const SPHERICAL_RADIUS_6367470 = 1;
    const SPHERICAL_RADIUS_IN_M_BY_PRODUCER = 2;
    const OBLATE_SPHEROID_IAU1965 = 3;
    const OBLATE_SPHEROID_AXES_IN_KM_BY_PRODUCER = 4;
    const OBLATE_SPHEROID_IAG_GRS80 = 5;
    const WGS84 = 6;
    const SPHERICAL_RADIUS_6371229 = 7;
    const OBLATE_SPHEROID_AXES_IN_M_BY_PRODUCER = 8;
    const SPHERICAL_RADIUS_6371200_HOR_WGS84 = 9;
    const OSGB1936 = 10;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
