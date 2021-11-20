<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

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
                    case TimeUnit::M: return $value / 60;
                    case TimeUnit::H: return $value / 60 / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case TimeUnit::MS:
                switch ($targetUnit) {
                    case TimeUnit::S: return $value / 1000;
                    case TimeUnit::M: return $value / 1000 / 60;
                    case TimeUnit::H: return $value / 1000 / 60 / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case TimeUnit::M:
                switch ($targetUnit) {
                    case TimeUnit::MS: return $value * 60 * 1000;
                    case TimeUnit::S: return $value * 60;
                    case TimeUnit::H: return $value / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit);
                }
            case TimeUnit::H:
                switch ($targetUnit) {
                    case TimeUnit::MS: return $value * 60 * 60 * 1000;
                    case TimeUnit::S: return $value * 60 * 60;
                    case TimeUnit::M: return $value * 60;
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
