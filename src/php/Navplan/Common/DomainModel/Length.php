<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class Length {
    const FT_PER_M = 3.2808;
    const M_PER_NM = 1852;
    const FT_PER_NM = self::FT_PER_M * self::M_PER_NM;


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
}
