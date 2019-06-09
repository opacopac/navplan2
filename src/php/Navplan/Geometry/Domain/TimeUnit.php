<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;


use InvalidArgumentException;

class TimeUnit {
    const S = 1;
    const MS = 2;


    public static function fromString(string $timeUnitString): int {
        switch(trim(strtoupper($timeUnitString))) {
            case 'S': return self::S;
            case 'MS': return self::MS;
            default: throw new InvalidArgumentException('unknown time unit ' . $timeUnitString);
        }
    }


    public static function toString(int $timeUnit): string {
        switch($timeUnit) {
            case self::S: return 'S';
            case self::MS: return 'MS';
            default: throw new InvalidArgumentException('unknown time unit: ' . $timeUnit);
        }
    }
}
