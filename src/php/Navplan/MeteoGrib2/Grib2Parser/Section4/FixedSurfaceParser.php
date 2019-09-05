<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Domain\Section4\FixedSurface;
use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;


class FixedSurfaceParser {
    public static function parse(int $type, int $scaleFactor, int $scaledValue): ?FixedSurface {
        if ($type === 255) {
            return NULL;
        } else {
            return new FixedSurface(
                $type,
                ScaledValue::unscale($scaleFactor, $scaledValue)
            );
        }
    }
}
