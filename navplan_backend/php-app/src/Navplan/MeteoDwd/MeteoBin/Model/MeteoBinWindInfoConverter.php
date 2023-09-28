<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Model;


class MeteoBinWindInfoConverter {
    private const NONE_VALUE = 0xFF;


    public static function windKtfromBinValue(string $binValue): ?float {
        $value = ord($binValue);

        if ($value == self::NONE_VALUE) {
            return null;
        }

        return $value - 128;
    }


    public static function gustKtFromBinValue(string $binValue): ?float {
        $value = ord($binValue);

        if ($value == self::NONE_VALUE) {
            return null;
        }

        return $value;
    }
}
