<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;


class FloatParser {
    public static function parse(int $unsignedSingle): float {
        //               |2345678|2345678|2345678|2345678
        $signBitmask = 0b10000000000000000000000000000000;
        $expBitmask =  0b01111111100000000000000000000000;
        $fracBitmask = 0b00000000011111111111111111111111;

        $s = ($unsignedSingle & $signBitmask) >> 31;
        $x = ($unsignedSingle & $expBitmask) >> 23;
        $m = ($unsignedSingle & $fracBitmask);

        return pow(-1, $s) * (1 + $m * pow(2, -23)) * pow(2, $x - 127);
    }
}
