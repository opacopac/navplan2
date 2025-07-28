<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Speed
{
    public function __construct(
        public float $value,
        public SpeedUnit $unit,
    )
    {
    }


    private static function convertSpeed(
        float $value,
        SpeedUnit $unit,
        SpeedUnit $convertToUnit
    ): float
    {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            SpeedUnit::KT => match ($convertToUnit) {
                SpeedUnit::KMH => $value * (Length::M_PER_NM / 1000),
                SpeedUnit::MPS => $value / (3600 / Length::M_PER_NM),
                SpeedUnit::FPM => $value * (Length::FT_PER_NM / 60),
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit->value),
            },
            SpeedUnit::KMH => match ($convertToUnit) {
                SpeedUnit::KT => $value / (Length::M_PER_NM / 1000),
                SpeedUnit::MPS => $value * 3.6,
                SpeedUnit::FPM => $value * (Length::FT_PER_NM / 60) / (Length::M_PER_NM / 1000),
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit->value),
            },
            SpeedUnit::MPS => match ($convertToUnit) {
                SpeedUnit::KT => $value * (3600 / Length::M_PER_NM),
                SpeedUnit::KMH => $value / 3.6,
                SpeedUnit::FPM => $value * (Length::FT_PER_NM / 60) / (Length::M_PER_NM / 1000),
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit->value),
            },
            SpeedUnit::FPM => match ($convertToUnit) {
                SpeedUnit::KT => $value / (Length::FT_PER_NM / 60),
                SpeedUnit::KMH => $value / (Length::FT_PER_NM / 60) * (Length::M_PER_NM / 1000),
                SpeedUnit::MPS => $value / (Length::FT_PER_NM / 60) * (Length::M_PER_NM / 1000) / 3600,
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit->value),
            },
            default => throw new InvalidArgumentException("unknown speed unit: " . $unit->value),
        };
    }


    public static function fromValueAndUnitString(
        ?float $value,
        ?string $unit
    ): ?Speed
    {
        if ($value === null || $unit === null || $unit === '') {
            return null;
        }

        return new Speed($value, SpeedUnit::from($unit));
    }


    public function getKt(): float
    {
        return $this->getValue(SpeedUnit::KT);
    }


    public function getKmh(): float
    {
        return $this->getValue(SpeedUnit::KMH);
    }


    public function getMps(): float
    {
        return $this->getValue(SpeedUnit::MPS);
    }


    public function getFtMin(): float
    {
        return $this->getValue(SpeedUnit::FPM);
    }


    public function getValue(SpeedUnit $asUnit): float
    {
        return Speed::convertSpeed($this->value, $this->unit, $asUnit);
    }
}
