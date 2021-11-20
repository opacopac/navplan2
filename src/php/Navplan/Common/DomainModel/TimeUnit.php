<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


use InvalidArgumentException;

class TimeUnit {
    const S = 1;
    const MS = 2;
    const M = 3;
    const H = 4;


    public static function fromString(string $timeUnitString): int {
        switch(trim(strtoupper($timeUnitString))) {
            case 'S': return self::S;
            case 'MS': return self::MS;
            case 'M': return self::M;
            case 'H': return self::H;
            default: throw new InvalidArgumentException('unknown time unit ' . $timeUnitString);
        }
    }


    public static function toString(int $timeUnit): string {
        switch($timeUnit) {
            case self::S: return 'S';
            case self::MS: return 'MS';
            case self::M: return 'M';
            case self::H: return 'H';
            default: throw new InvalidArgumentException('unknown time unit: ' . $timeUnit);
        }
    }
}
