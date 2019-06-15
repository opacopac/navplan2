<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class Angle {
    public $value;
    public $unit;


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
        float $value,
        int $unit
    ) {
        $this->value = $value;
        $this->unit = $unit;
    }


    public function getValue(int $unit): float {
        return self::convert($this->value, $this->unit, $unit);
    }
}