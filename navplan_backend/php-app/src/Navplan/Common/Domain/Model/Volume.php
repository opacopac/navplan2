<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Volume {
    const L_PER_GAL = 3.78541;


    public function __construct(
        public float $value,
        public VolumeUnit $unit,
    ) {
    }


    private static function convertVolume(
        float $value,
        VolumeUnit $unit,
        VolumeUnit $convertToUnit
    ): float {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            VolumeUnit::L => match ($convertToUnit) {
                VolumeUnit::GAL => $value / Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown volume unit: " . $convertToUnit->value),
            },
            VolumeUnit::GAL => match ($convertToUnit) {
                VolumeUnit::L => $value * Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown volume unit: " . $convertToUnit->value),
            },
            default => throw new InvalidArgumentException("unknown volume unit: " . $unit->value),
        };
    }


    public function getL(): float {
        return $this->getValue(VolumeUnit::L);
    }


    public function getGal(): float {
        return $this->getValue(VolumeUnit::GAL);
    }


    public function getValue(VolumeUnit $asUnit): float {
        return Volume::convertVolume($this->value, $this->unit, $asUnit);
    }
}
