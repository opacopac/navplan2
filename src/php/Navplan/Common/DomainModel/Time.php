<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;


class Time {
    public static function convert(
        float $value,
        TimeUnit $sourceUnit,
        TimeUnit $targetUnit
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
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case TimeUnit::MS:
                switch ($targetUnit) {
                    case TimeUnit::S: return $value / 1000;
                    case TimeUnit::M: return $value / 1000 / 60;
                    case TimeUnit::H: return $value / 1000 / 60 / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case TimeUnit::M:
                switch ($targetUnit) {
                    case TimeUnit::MS: return $value * 60 * 1000;
                    case TimeUnit::S: return $value * 60;
                    case TimeUnit::H: return $value / 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            case TimeUnit::H:
                switch ($targetUnit) {
                    case TimeUnit::MS: return $value * 60 * 60 * 1000;
                    case TimeUnit::S: return $value * 60 * 60;
                    case TimeUnit::M: return $value * 60;
                    default: throw new InvalidArgumentException('unknown target unit "' . $targetUnit->value);
                }
            default: throw new InvalidArgumentException('unknown source unit "' . $targetUnit->value);
        }
    }


    public function __construct(
        public float $value,
        public TimeUnit $unit
    ) {
    }


    public function getValue(TimeUnit $unit): float {
        return self::convert($this->value, $this->unit, $unit);
    }


    public function getH(): float {
        return $this->getValue(TimeUnit::H);
    }


    public function getM(): float {
        return $this->getValue(TimeUnit::M);
    }


    public function getS(): float {
        return $this->getValue(TimeUnit::S);
    }


    public function getHourMinString(bool $roundUp = true, string $separator = ":"): string {
        $hours = floor($this->getH());
        $mins = $this->getM() - $hours * 60;
        $minsInt = $roundUp ? (int) ceil($mins) : (int) round($mins);

        return $hours . $separator . StringNumberHelper::zeroPad($minsInt, 2);
    }
}
