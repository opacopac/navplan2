<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Speed {
    public function __construct(
        public float $value,
        /**
         * @var SpeedUnit
         */
        public int $unit,
    ) {
    }


    private static function convertSpeed(
        float $value,
        /**
         * @var SpeedUnit
         */
        int $unit,
        /**
         * @var SpeedUnit
         */
        int $convertToUnit
    ): float {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            SpeedUnit::KT => match ($convertToUnit) {
                SpeedUnit::KMH => $value * (Length::M_PER_NM / 1000),
                SpeedUnit::MPS => $value / (3600 / Length::M_PER_NM),
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit),
            },
            SpeedUnit::KMH => match ($convertToUnit) {
                SpeedUnit::KT => $value / (Length::M_PER_NM / 1000),
                SpeedUnit::MPS => $value * 3.6,
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit),
            },
            SpeedUnit::MPS => match ($convertToUnit) {
                SpeedUnit::KT => $value * (3600 / Length::M_PER_NM),
                SpeedUnit::KMH => $value / 3.6,
                default => throw new InvalidArgumentException("unknown speed unit: " . $convertToUnit),
            },
            default => throw new InvalidArgumentException("unknown speed unit: " . $unit),
        };
    }


    public function getKt(): float {
        return $this->getValue(SpeedUnit::KT);
    }


    public function getKmh(): float {
        return $this->getValue(SpeedUnit::KMH);
    }


    public function getMps(): float {
        return $this->getValue(SpeedUnit::MPS);
    }


    public function getValue(
        /**
         * @var SpeedUnit
         */
        int $asUnit
    ): float {
        return Speed::convertSpeed($this->value, $this->unit, $asUnit);
    }
}
