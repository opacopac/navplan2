<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Model;


class MeteoBinPrecipConverter {
    private const NONE_VALUE = 0xFF;


    public static function precipFrom(string $binValue): int {
        $value = ord($binValue);

        if ($value === self::NONE_VALUE) {
            return 0;
        }

        return $value;
    }
}
