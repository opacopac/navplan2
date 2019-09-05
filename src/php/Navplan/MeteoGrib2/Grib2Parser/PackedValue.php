<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;


class PackedValue {
    public static function unpack(
        float $referenceValue,
        int $packedValue,
        int $binScaleFactor,
        int $decScaleFactor,
        FieldType $originalFieldType
    ) {
        // Y = (R + X * 2^E) / 10^D
        $origValue = ($referenceValue + $packedValue * 1.0 * pow(2, $binScaleFactor)) / pow(10, $decScaleFactor);

        if ($originalFieldType === FieldType::INTEGER)
            return intval($origValue);
        else
            return $origValue;
    }
}

