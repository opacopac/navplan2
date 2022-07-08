<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Consumption {
    public function __construct(
        public float $value,
        public ConsumptionUnit $unit,
    ) {
    }


    private static function convert(
        float $value,
        ConsumptionUnit $unit,
        ConsumptionUnit $convertToUnit
    ): float {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            ConsumptionUnit::L_PER_H => match ($convertToUnit) {
                ConsumptionUnit::GAL_PER_H => $value / Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown consumption unit: " . $convertToUnit->value),
            },
            ConsumptionUnit::GAL_PER_H => match ($convertToUnit) {
                ConsumptionUnit::L_PER_H => $value * Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown consumption unit: " . $convertToUnit->value),
            },
            default => throw new InvalidArgumentException("unknown consumption unit: " . $unit->value),
        };
    }


    public function getLph(): float {
        return $this->getValue(ConsumptionUnit::L_PER_H);
    }


    public function getGph(): float {
        return $this->getValue(ConsumptionUnit::GAL_PER_H);
    }


    public function getValue(ConsumptionUnit $asUnit): float {
        return Consumption::convert($this->value, $this->unit, $asUnit);
    }
}
