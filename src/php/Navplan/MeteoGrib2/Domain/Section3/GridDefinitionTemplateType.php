<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;

use Navplan\Shared\Enum;


// https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-1.shtml
class GridDefinitionTemplateType extends Enum {
    const UNKNOWN = 0;
    const LAT_LON = 1;
    const LAT_LON_ROTATED = 2;
    const LAT_LON_STRETCHED = 3;
    const LAT_LON_STRETCHED_ROTATED = 4;
    const MERCATOR = 5;
    const POLAR_STEREOGRAPHIC = 6;
    const LAMBERT_CONFORMAL = 7;
    const GAUSSIAN_LAT_LON = 8;
    const GAUSSIAN_LAT_LON_ROTATED = 9;
    const GAUSSIAN_LAT_LON_STRETCHED = 10;
    const GAUSSIAN_LAT_LON_STRETCHED_ROTATED = 11;
    const SPHERICAL_HARMONIC_COEFFICIENTS = 12;
    const SPHERICAL_HARMONIC_COEFFICIENTS_ROTATED = 13;
    const SPHERICAL_HARMONIC_COEFFICIENTS_STRETCHED = 14;
    const SPHERICAL_HARMONIC_COEFFICIENTS_STRETCHED_ROTATED = 15;
    const SPACE_VIEW_PERSPECTIVE_ORTHOGRAPHIC = 16;
    const TRIANGULAR_ICOSAHEDRON = 17;
    const EQUATORIAL_AZIMUTHAL_EQUIDISTANT = 18;
    const AZIMUTHAL_RANGE = 19;
    const CROSS_SECTION_HOR_POINTS_EQUALLY_SPACED = 20;
    const HOVMOELLER_HOR_POINTS_EQUALLY_SPACED = 21;
    const TIME_SECTION = 22;
    const MISSING = 99999;

    const __default = self::UNKNOWN;
}
