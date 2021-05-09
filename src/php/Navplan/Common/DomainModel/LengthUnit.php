<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class LengthUnit {
    const M = 1;
    const FT = 2;
    const NM = 3;


    public static function fromString(string $lengthUnitString): int {
        switch(trim(strtoupper($lengthUnitString))) {
            case 'M': return self::M;
            case 'F':
            case 'FT':
                return self::FT;
            case 'MM': return self::NM;
            default: throw new InvalidArgumentException('unknown length unit ' . $lengthUnitString);
        }
    }


    public static function toString(int $lengthUnit): string {
        switch($lengthUnit) {
            case self::M: return 'M';
            case self::FT: return 'FT';
            case self::NM: return 'NM';
            default: throw new InvalidArgumentException('unknown length unit: ' . $lengthUnit);
        }
    }
}
