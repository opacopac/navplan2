<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinModel;


class MeteoBinWwConverter {
    private const NONE_VALUE = 0xFF;


    public static function fromBinValue(string $binValue): ?float {
        $value = ord($binValue);

        if ($value == self::NONE_VALUE) {
            return null;
        }

        return $value;
    }
}
