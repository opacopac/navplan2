<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;


class ScaledValue {
    public static function unscale(int $scaleFactor, int $scaledValue): float {
        return $scaledValue / pow(10, $scaleFactor);
    }
}
