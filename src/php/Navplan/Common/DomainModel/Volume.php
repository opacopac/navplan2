<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Volume {
    const L_PER_GAL = 3.78541;


    public function __construct(
        public float $value,
        /**
         * @var VolumeUnit
         */
        public int $unit,
    ) {
    }


    private static function convertVolume(
        float $value,
        /**
         * @var VolumeUnit
         */
        int $unit,
        /**
         * @var VolumeUnit
         */
        int $convertToUnit
    ): float {
        if ($unit === $convertToUnit) {
            return $value;
        }

        return match ($unit) {
            VolumeUnit::L => match ($convertToUnit) {
                VolumeUnit::GAL => $value / Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown volume unit: " . $convertToUnit),
            },
            VolumeUnit::GAL => match ($convertToUnit) {
                VolumeUnit::L => $value * Volume::L_PER_GAL,
                default => throw new InvalidArgumentException("unknown volume unit: " . $convertToUnit),
            },
            default => throw new InvalidArgumentException("unknown volume unit: " . $unit),
        };
    }


    public function getValue(
        /**
         * @var VolumeUnit
         */
        int $asUnit
    ): float {
        return Volume::convertVolume($this->value, $this->unit, $asUnit);
    }
}
