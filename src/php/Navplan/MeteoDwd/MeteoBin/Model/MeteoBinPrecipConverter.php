<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Model;


use Navplan\Common\Domain\Model\Precipitation;

class MeteoBinPrecipConverter {
    private const NONE_VALUE = 0xFF;


    public static function precipFrom(string $binValue): Precipitation {
        $value = ord($binValue);

        if ($value === self::NONE_VALUE) {
            return Precipitation::fromMM(0);
        }

        return Precipitation::fromMM($value);
    }
}
