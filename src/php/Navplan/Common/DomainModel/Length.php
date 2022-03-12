<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Length {
    const FT_PER_M = 3.28084;
    const M_PER_NM = 1852;
    const FT_PER_NM = self::FT_PER_M * self::M_PER_NM;
    const MM_PER_INCH = 25.4;


    public static function createZero(): Length {
        return new Length(0, LengthUnit::M);
    }


    public static function fromM(float $value): Length {
        return new Length($value, LengthUnit::M);
    }


    public static function fromFt(float $value): Length {
        return new Length($value, LengthUnit::FT);
    }


    public static function fromNm(float $value): Length {
        return new Length($value, LengthUnit::NM);
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
            case LengthUnit::NM:
                switch ($targetUnit) {
                    case LengthUnit::FT: return $value * self::FT_PER_NM;
                    case LengthUnit::M: return $value * self::M_PER_NM;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case LengthUnit::FT:
                switch ($targetUnit) {
                    case LengthUnit::NM: return $value / self::FT_PER_NM;
                    case LengthUnit::M: return $value / self::FT_PER_M;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case LengthUnit::M:
                switch ($targetUnit) {
                    case LengthUnit::NM: return $value / self::M_PER_NM;
                    case LengthUnit::FT: return $value * self::FT_PER_M;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            default: throw new InvalidArgumentException('unknown source unit "' . $targetUnit);
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


    public function getM(): float {
        return self::getValue(LengthUnit::M);
    }


    public function getFt(): float {
        return self::getValue(LengthUnit::FT);
    }


    public function getNm(): float {
        return self::getValue(LengthUnit::NM);
    }


    public function add(Length $length): Length {
        return new Length($length->getValue($this->unit) + $this->value, $this->unit);
    }


    public function mult(float $factor): Length {
        return new Length($this->value * $factor, $this->unit);
    }


    public function isGtOrEqThan(Length $length): bool {
        return $this->value >= $length->getValue($this->unit);
    }


    public function isGtThan(Length $length): bool {
        return $this->value > $length->getValue($this->unit);
    }
}
