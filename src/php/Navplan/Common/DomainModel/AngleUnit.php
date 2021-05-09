<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


use InvalidArgumentException;

class AngleUnit {
    const DEG = 1;
    const RAD = 2;


    public static function fromString(string $angleUnitString): int {
        switch(trim(strtoupper($angleUnitString))) {
            case 'DEG': return self::DEG;
            case 'RAD': return self::RAD;
            default: throw new InvalidArgumentException('unknown angle unit ' . $angleUnitString);
        }
    }


    public static function toString(int $angleUnit): string {
        switch($angleUnit) {
            case self::DEG: return 'DEG';
            case self::RAD: return 'RAD';
            default: throw new InvalidArgumentException('unknown angle unit: ' . $angleUnit);
        }
    }
}
