<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;

use InvalidArgumentException;


class Time {
    public static function convert(
        float $value,
        int $sourceUnit,
        int $targetUnit
    ): float {
        if ($sourceUnit === $targetUnit) {
            return $value;
        }

        switch ($sourceUnit) {
            case TimeUnit::S:
                switch ($targetUnit) {
                    case TimeUnit::MS: return $value * 1000;
                    case TimeUnit::MIN: return $value / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case TimeUnit::MS:
                switch ($targetUnit) {
                    case TimeUnit::S: return $value / 1000;
                    case TimeUnit::MIN: return $value / 1000 / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case TimeUnit::MIN:
                switch ($targetUnit) {
                    case TimeUnit::S: return $value * 60;
                    case TimeUnit::MS: return $value * 60 * 1000;
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
