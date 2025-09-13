<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Model;


use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;

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
