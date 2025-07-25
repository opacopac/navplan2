<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Length {
    const FT_PER_M = 3.28084;
    const M_PER_NM = 1852;
    const FT_PER_NM = self::FT_PER_M * self::M_PER_NM;


    public static function createZero(): Length {
        return new Length(0, LengthUnit::M);
    }


    public static function fromM(float|null $value): ?Length {
        if ($value === null) {
            return null;
        }

        return new Length($value, LengthUnit::M);
    }


    public static function fromFt(float|null $value): ?Length {
        if ($value === null) {
            return null;
        }

        return new Length($value, LengthUnit::FT);
    }


    public static function fromNm(float|null $value): ?Length {
        if ($value === null) {
            return null;
        }

        return new Length($value, LengthUnit::NM);
    }


    public static function convert(
        float $value,
        LengthUnit $sourceUnit,
        LengthUnit $targetUnit
    ): float {
        if ($sourceUnit === $targetUnit) {
            return $value;
        }

        switch ($sourceUnit) {
            case LengthUnit::NM:
                switch ($targetUnit) {
                    case LengthUnit::FT: return $value * self::FT_PER_NM;
                    case LengthUnit::M: return $value * self::M_PER_NM;
                    case LengthUnit::KM: return $value * self::M_PER_NM / 1000;
                    case LengthUnit::IN: return $value * self::FT_PER_NM * 12;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case LengthUnit::FT:
                switch ($targetUnit) {
                    case LengthUnit::NM: return $value / self::FT_PER_NM;
                    case LengthUnit::M: return $value / self::FT_PER_M;
                    case LengthUnit::KM: return $value / self::FT_PER_M / 1000;
                    case LengthUnit::IN: return $value * 12;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case LengthUnit::M:
                switch ($targetUnit) {
                    case LengthUnit::NM: return $value / self::M_PER_NM;
                    case LengthUnit::FT: return $value * self::FT_PER_M;
                    case LengthUnit::KM: return $value / 1000;
                    case LengthUnit::IN: return $value * self::FT_PER_M * 12;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case LengthUnit::KM:
                switch ($targetUnit) {
                    case LengthUnit::M: return $value * 1000;
                    case LengthUnit::FT: return $value * self::FT_PER_M * 1000;
                    case LengthUnit::NM: return $value * self::M_PER_NM / 1000;
                    case LengthUnit::IN: return $value * self::FT_PER_M * 12 * 1000;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case LengthUnit::IN:
                switch ($targetUnit) {
                    case LengthUnit::M: return $value / self::FT_PER_M / 12;
                    case LengthUnit::FT: return $value / 12;
                    case LengthUnit::NM: return $value / self::FT_PER_NM / 12;
                    case LengthUnit::KM: return $value / self::FT_PER_M / 12 / 1000;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            default: throw new InvalidArgumentException('unknown source unit "' . $targetUnit->value);
        }
    }


    public function __construct(
        public float $value,
        public LengthUnit $unit
    ) {
    }


    public function getValue(LengthUnit $unit): float {
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
