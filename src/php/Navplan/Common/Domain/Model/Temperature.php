<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Temperature {
    const ZERO_C_IN_KELVIN = 273.15;
    const ZERO_C_IN_FAHRENHEIT = 32;
    const F_PER_C = 1.8;


    public function __construct(
        public float $value,
        public TemperatureUnit $unit,
    ) {
    }


    private static function convertTemperature(
        float $value,
        TemperatureUnit $unit,
        TemperatureUnit $convertToUnit
    ): float {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            TemperatureUnit::K => match ($convertToUnit) {
                TemperatureUnit::C => $value - self::ZERO_C_IN_KELVIN,
                TemperatureUnit::F => ($value - self::ZERO_C_IN_KELVIN) * self::F_PER_C + self::ZERO_C_IN_FAHRENHEIT,
                default => throw new InvalidArgumentException("unknown temperature unit: " . $convertToUnit->value),
            },
            TemperatureUnit::C => match ($convertToUnit) {
                TemperatureUnit::K => $value + self::ZERO_C_IN_KELVIN,
                TemperatureUnit::F => $value * self::F_PER_C + self::ZERO_C_IN_FAHRENHEIT,
                default => throw new InvalidArgumentException("unknown temperature unit: " . $convertToUnit->value),
            },
            TemperatureUnit::F => match ($convertToUnit) {
                TemperatureUnit::K => ($value - self::ZERO_C_IN_FAHRENHEIT) / self::F_PER_C + self::ZERO_C_IN_KELVIN,
                TemperatureUnit::C => ($value - self::ZERO_C_IN_FAHRENHEIT) / self::F_PER_C,
                default => throw new InvalidArgumentException("unknown temperature unit: " . $convertToUnit->value),
            },
            default => throw new InvalidArgumentException("unknown temperature unit: " . $unit->value),
        };
    }


    public function getK(): float {
        return $this->getValue(TemperatureUnit::K);
    }


    public function getC(): float {
        return $this->getValue(TemperatureUnit::C);
    }


    public function getF(): float {
        return $this->getValue(TemperatureUnit::F);
    }


    public function getValue(TemperatureUnit $asUnit): float {
        return Temperature::convertTemperature($this->value, $this->unit, $asUnit);
    }
}
