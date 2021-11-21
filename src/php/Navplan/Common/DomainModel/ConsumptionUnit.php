<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class ConsumptionUnit {
    const L_PER_H = 1;
    const GAL_PER_H = 2;


    public static function fromString(string $consumptionUnitString): int {
        return match (trim(strtoupper($consumptionUnitString))) {
            'L_PER_H' => self::L_PER_H,
            'GAL_PER_H' => self::GAL_PER_H,
            default => throw new InvalidArgumentException('unknown consumption unit ' . $consumptionUnitString),
        };
    }


    public static function toString(int $consumptionUnit): string {
        return match ($consumptionUnit) {
            self::L_PER_H => 'L_PER_H',
            self::GAL_PER_H => 'GAL_PER_H',
            default => throw new InvalidArgumentException('unknown consumption unit: ' . $consumptionUnit),
        };
    }
}
