<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplateType;


class GridDefinitionTemplateTypeParser {
    public static function parse(int $value): GridDefinitionTemplateType {
        switch ($value) {
            case 0: return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON);
            case 1: return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON_ROTATED);
            case 2: return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON_STRETCHED);
            case 3: return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAT_LON_STRETCHED_ROTATED);
            case 10: return new GridDefinitionTemplateType(GridDefinitionTemplateType::MERCATOR);
            case 20: return new GridDefinitionTemplateType(GridDefinitionTemplateType::POLAR_STEREOGRAPHIC);
            case 30: return new GridDefinitionTemplateType(GridDefinitionTemplateType::LAMBERT_CONFORMAL);
            case 40: return new GridDefinitionTemplateType(GridDefinitionTemplateType::GAUSSIAN_LAT_LON);
            case 41: return new GridDefinitionTemplateType(GridDefinitionTemplateType::GAUSSIAN_LAT_LON_ROTATED);
            case 42: return new GridDefinitionTemplateType(GridDefinitionTemplateType::GAUSSIAN_LAT_LON_STRETCHED);
            case 43: return new GridDefinitionTemplateType(GridDefinitionTemplateType::GAUSSIAN_LAT_LON_STRETCHED_ROTATED);
            case 50: return new GridDefinitionTemplateType(GridDefinitionTemplateType::SPHERICAL_HARMONIC_COEFFICIENTS);
            case 51: return new GridDefinitionTemplateType(GridDefinitionTemplateType::SPHERICAL_HARMONIC_COEFFICIENTS_ROTATED);
            case 52: return new GridDefinitionTemplateType(GridDefinitionTemplateType::SPHERICAL_HARMONIC_COEFFICIENTS_STRETCHED);
            case 53: return new GridDefinitionTemplateType(GridDefinitionTemplateType::SPHERICAL_HARMONIC_COEFFICIENTS_STRETCHED_ROTATED);
            case 90: return new GridDefinitionTemplateType(GridDefinitionTemplateType::SPACE_VIEW_PERSPECTIVE_ORTHOGRAPHIC);
            case 100: return new GridDefinitionTemplateType(GridDefinitionTemplateType::TRIANGULAR_ICOSAHEDRON);
            case 110: return new GridDefinitionTemplateType(GridDefinitionTemplateType::EQUATORIAL_AZIMUTHAL_EQUIDISTANT);
            case 120: return new GridDefinitionTemplateType(GridDefinitionTemplateType::AZIMUTHAL_RANGE);
            case 1000: return new GridDefinitionTemplateType(GridDefinitionTemplateType::CROSS_SECTION_HOR_POINTS_EQUALLY_SPACED);
            case 1100: return new GridDefinitionTemplateType(GridDefinitionTemplateType::HOVMOELLER_HOR_POINTS_EQUALLY_SPACED);
            case 1200: return new GridDefinitionTemplateType(GridDefinitionTemplateType::TIME_SECTION);
            case 99999: return new GridDefinitionTemplateType(GridDefinitionTemplateType::MISSING);
            default: return new GridDefinitionTemplateType(GridDefinitionTemplateType::UNKNOWN);
        }
    }
}
