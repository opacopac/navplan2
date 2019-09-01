<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\LatLon;


class LatLonParser {
    public static function parse(int $latValue, int $lonValue): LatLon {
        return new LatLon(
            $latValue / 1000000,
            $lonValue / 1000000
        );
    }
}
