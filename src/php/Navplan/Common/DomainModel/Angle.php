<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Angle {
    public static function fromDeg(float $rotDeg): Angle {
        return new Angle($rotDeg, AngleUnit::DEG);
    }


    public static function fromRad(float $rotRad): Angle {
        return new Angle($rotRad, AngleUnit::RAD);
    }


    public static function convert(
        float $value,
        int $sourceUnit,
        int $targetUnit
    ): float {
        if ($sourceUnit === $targetUnit) {
            return $value;
        }

        switch ($sourceUnit) {
            case AngleUnit::DEG:
                switch ($targetUnit) {
                    case AngleUnit::RAD: return $value / 180 * pi();
                    default: throw new InvalidArgumentException('unknown target unit ' . $targetUnit);
                }
            case AngleUnit::RAD:
                switch ($targetUnit) {
                    case AngleUnit::DEG: return $value / pi() * 180;
                    default: throw new InvalidArgumentException('unknown target unit ' . $targetUnit);
                }
            default: throw new InvalidArgumentException('unknown source unit ' . $targetUnit);
        }
    }


    public function __construct(
        public float $value,
        public int $unit
    ) {
    }


    public function getValue(int $unit): float {
        return self::convert($this->value, $this->unit, $unit);
    }


    public function toDeg(): float {
        return $this->getValue(AngleUnit::DEG);
    }


    public function toRad(): float {
        return $this->getValue(AngleUnit::RAD);
    }


    public function getNegative(): Angle {
        return new Angle(-$this->value, $this->unit);
    }
}
