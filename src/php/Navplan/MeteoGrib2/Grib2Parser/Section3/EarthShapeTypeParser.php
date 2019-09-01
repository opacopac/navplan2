<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShapeType;


class EarthShapeTypeParser {
    public static function parse(int $value): EarthShapeType {
        switch ($value) {
            case 0: return new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_6367470);
            case 1: return new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_IN_M_BY_PRODUCER);
            case 2: return new EarthShapeType(EarthShapeType::OBLATE_SPHEROID_IAU1965);
            case 3: return new EarthShapeType(EarthShapeType::OBLATE_SPHEROID_AXES_IN_KM_BY_PRODUCER);
            case 4: return new EarthShapeType(EarthShapeType::OBLATE_SPHEROID_IAG_GRS80);
            case 5: return new EarthShapeType(EarthShapeType::WGS84);
            case 6: return new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_6371229);
            case 7: return new EarthShapeType(EarthShapeType::OBLATE_SPHEROID_AXES_IN_M_BY_PRODUCER);
            case 8: return new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_6371200_HOR_WGS84);
            case 9: return new EarthShapeType(EarthShapeType::OSGB1936);
            case 255: return new EarthShapeType(EarthShapeType::MISSING);
            default: return new EarthShapeType(EarthShapeType::UNKNOWN);
        }
    }
}
