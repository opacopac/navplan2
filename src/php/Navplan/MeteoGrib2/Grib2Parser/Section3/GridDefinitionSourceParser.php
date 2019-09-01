<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSource;


class GridDefinitionSourceParser {
    public static function parse(int $value): GridDefinitionSource {
        switch ($value) {
            case 0: return new GridDefinitionSource(GridDefinitionSource::TEMPLATE);
            case 1: return new GridDefinitionSource(GridDefinitionSource::PREDETERMINED);
            case 255: return new GridDefinitionSource(GridDefinitionSource::NONE);
            default: return new GridDefinitionSource(GridDefinitionSource::UNKNOWN);
        }
    }
}
