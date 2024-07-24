<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Weight
{
    const LBS_PER_KG = 2.20462;


    public function __construct(
        public float $value,
        public WeightUnit $unit,
    )
    {
    }


    private static function convertWeight(
        float $value,
        WeightUnit $unit,
        WeightUnit $convertToUnit
    ): float
    {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            WeightUnit::KG => match ($convertToUnit) {
                WeightUnit::LBS => $value * self::LBS_PER_KG,
                default => throw new InvalidArgumentException("unknown weight unit: " . $convertToUnit->value),
            },
            WeightUnit::LBS => match ($convertToUnit) {
                WeightUnit::KG => $value / self::LBS_PER_KG,
                default => throw new InvalidArgumentException("unknown weight unit: " . $convertToUnit->value),
            },
            default => throw new InvalidArgumentException("unknown weight unit: " . $unit->value),
        };
    }


    public function getKg(): float
    {
        return $this->getValue(WeightUnit::KG);
    }


    public function getLbs(): float
    {
        return $this->getValue(WeightUnit::LBS);
    }


    public function getValue(WeightUnit $asUnit): float
    {
        return Weight::convertWeight($this->value, $this->unit, $asUnit);
    }
}
