<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section0;

use Navplan\MeteoGrib2\Domain\Section0\Discipline;


class DisciplineParser {
    public static function parse(int $value): Discipline {
        switch ($value) {
            case 0: return new Discipline(Discipline::METEOROLOGICAL_PRODUCTS);
            case 1: return new Discipline(Discipline::HYDROLOGICAL_PRODUCTS);
            case 2: return new Discipline(Discipline::LAND_SURFACE_PRODUCTS);
            case 3: return new Discipline(Discipline::SPACE_PRODUCTS);
            case 4: return new Discipline(Discipline::SPACE_WEATHER_PRODUCTS);
            case 10: return new Discipline(Discipline::OCEANOGRAPHIC_PRODUCTS);
            case 255: return new Discipline(Discipline::MISSING);
            default: return new Discipline(Discipline::UNKNOWN);
        }
    }
}
