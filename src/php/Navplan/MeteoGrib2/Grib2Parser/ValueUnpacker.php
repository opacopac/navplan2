<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;


class ValueUnpacker {
    private $referenceValue;
    private $binScaleValue;
    private $decScaleValue;
    private $originalFieldType;


    public function __construct(
        float $referenceValue,
        int $binScaleFactor,
        int $decScaleFactor,
        FieldType $originalFieldType
    ) {
        $this->referenceValue = $referenceValue;
        $this->binScaleValue = pow(2, $binScaleFactor);
        $this->decScaleValue = pow(10, $decScaleFactor);
        $this->originalFieldType = $originalFieldType;
    }


    public function unpack(int $packedValue) {
        // Y = (R + X * 2^E) / 10^D
        $origValue = ($this->referenceValue + $packedValue * $this->binScaleValue) / $this->decScaleValue;

        if ($this->originalFieldType === FieldType::INTEGER)
            return intval($origValue);
        else
            return $origValue;
    }
}
