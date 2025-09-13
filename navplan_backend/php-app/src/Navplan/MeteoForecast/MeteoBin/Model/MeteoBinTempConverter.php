<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Model;


class MeteoBinTempConverter {
    private const NONE_VALUE = 0xFF;


    public static function tempFrom(string $binValue): float {
        $value = ord($binValue);

        if ($value === self::NONE_VALUE) {
            return 255.0;
        }

        return ($value - 128.0) / 2.0;
    }
}
