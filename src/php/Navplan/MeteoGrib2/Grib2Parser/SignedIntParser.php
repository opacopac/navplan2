<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;


class SignedIntParser {
    public static function parse(int $unsignedShort): int {
        if ($unsignedShort >= pow(2, 15))
            return -$unsignedShort + pow(2, 15);
        else
            return $unsignedShort;
    }
}
