<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;


class Grib2ParserHelper {
    public static function parseSectionLength($fileHandle): int {
        $lenStr = fread($fileHandle, 4);
        return unpack("N1a", $lenStr)["a"];
    }
}
