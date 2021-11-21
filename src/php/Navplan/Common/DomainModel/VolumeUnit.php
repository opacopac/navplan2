<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class VolumeUnit {
    const L = 1;
    const GAL = 2;


    public static function fromString(string $volUnitString): int {
        switch(trim(strtoupper($volUnitString))) {
            case 'L': return self::L;
            case 'GAL': return self::GAL;
            default: throw new InvalidArgumentException('unknown volume unit ' . $volUnitString);
        }
    }


    public static function toString(int $volUnit): string {
        switch($volUnit) {
            case self::L: return 'L';
            case self::GAL: return 'GAL';
            default: throw new InvalidArgumentException('unknown volume unit: ' . $volUnit);
        }
    }
}
