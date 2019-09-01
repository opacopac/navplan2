<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\ProjectionCenter;


class ProjectionCenterParser {
    public static function parse(int $bitmap): ProjectionCenter {
        return new ProjectionCenter(
            ($bitmap & 0b10000000) === 0,
            ($bitmap & 0b01000000) !== 0
        );
    }
}
