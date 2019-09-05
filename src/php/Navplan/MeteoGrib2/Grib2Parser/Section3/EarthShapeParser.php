<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShape;
use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;


class EarthShapeParser {
    public const LENGTH_BYTES = 16;


    public static function parse(string $data): EarthShape {
        $byteArray = unpack("C1a/C1b/N1c/C1d/N1e/C1f/N1g", $data);

        return new EarthShape(
            EarthShapeTypeParser::parse($byteArray["a"]),
            ScaledValue::unscale($byteArray["b"], $byteArray["c"]),
            ScaledValue::unscale($byteArray["d"], $byteArray["e"]),
            ScaledValue::unscale($byteArray["f"], $byteArray["g"])
        );
    }
}
