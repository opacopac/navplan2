<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class AltitudeUnit {
    const M = 1;
    const FT = 2;
    const FL = 3;


    public static function fromString(string $altUnitString): int {
        switch(trim(strtoupper($altUnitString))) {
            case 'M': return self::M;
            case 'F':
            case 'FT':
                return self::FT;
            case 'FL': return self::FL;
            default: throw new InvalidArgumentException('unknown altitude unit ' . $altUnitString);
        }
    }


    public static function toString(int $altUnit): string {
        switch($altUnit) {
            case self::M: return 'M';
            case self::FT: return 'FT';
            case self::FL: return 'FL';
            default: throw new InvalidArgumentException('unknown altitude unit: ' . $altUnit);
        }
    }
}
