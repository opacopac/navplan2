<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShape;


class EarthShapeParser {
    public const LENGTH_BYTES = 16;


    public static function parse(string $data): EarthShape {
        $byteArray = unpack("C1a/C1b/N1c/C1d/N1e/C1f/N1g", $data);

        return new EarthShape(
            EarthShapeTypeParser::parse($byteArray["a"]),
            $byteArray["b"],
            $byteArray["c"],
            $byteArray["d"],
            $byteArray["e"],
            $byteArray["f"],
            $byteArray["g"]
        );
    }
}
