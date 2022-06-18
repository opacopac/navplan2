<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinModel;


use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;

class MeteoBinWeatherInfoConverter {
    private const NONE_VALUE = 0xFF;


    public static function wwFromBinValue(string $binValue): ?int {
        $value = ord($binValue);

        if ($value == self::NONE_VALUE) {
            return null;
        }

        return $value;
    }


    public static function ceilingFtFromBinValue(string $binValue): ?Altitude {
        $value = ord($binValue);

        if ($value == self::NONE_VALUE) {
            return null;
        }

        return new Altitude($value * 200, AltitudeUnit::FT, AltitudeReference::MSL);
    }
}
