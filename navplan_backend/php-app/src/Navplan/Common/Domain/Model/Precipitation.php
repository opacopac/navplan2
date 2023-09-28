<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Precipitation {
    const MM_PER_INCH = 25.4;


    public static function createZero(): Precipitation {
        return new Precipitation(0, PrecipitationUnit::MM);
    }


    public static function fromMm(float $value): Precipitation {
        return new Precipitation($value, PrecipitationUnit::MM);
    }


    public static function fromIn(float $value): Precipitation {
        return new Precipitation($value, PrecipitationUnit::IN);
    }


    public static function convert(
        float $value,
        PrecipitationUnit $sourceUnit,
        PrecipitationUnit $targetUnit
    ): float {
        if ($sourceUnit === $targetUnit) {
            return $value;
        }

        return match ($sourceUnit) {
            PrecipitationUnit::MM => match ($targetUnit) {
                PrecipitationUnit::IN => $value / self::MM_PER_INCH,
                default => throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value),
            },
            PrecipitationUnit::IN => match ($targetUnit) {
                PrecipitationUnit::MM => $value * self::MM_PER_INCH,
                default => throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value),
            }
        };
    }


    public function __construct(
        public float $value,
        public PrecipitationUnit $unit
    ) {
    }


    public function getValue(PrecipitationUnit $unit): float {
        return self::convert($this->value, $this->unit, $unit);
    }


    public function getMm(): float {
        return self::getValue(PrecipitationUnit::MM);
    }


    public function getIn(): float {
        return self::getValue(PrecipitationUnit::IN);
    }
}
