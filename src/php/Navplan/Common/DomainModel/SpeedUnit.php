<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;


class SpeedUnit {
    const KT = 1;
    const KMH = 2;
    const MPS = 2;


    public static function fromString(string $speedUnitString): int {
        switch(trim(strtoupper($speedUnitString))) {
            case 'KT': return self::KT;
            case 'KMH': return self::KMH;
            case 'MPS': return self::MPS;
            default: throw new InvalidArgumentException('unknown speed unit ' . $speedUnitString);
        }
    }


    public static function toString(int $speedUnit): string {
        switch($speedUnit) {
            case self::KT: return 'KT';
            case self::KMH: return 'KMH';
            case self::MPS: return 'MPS';
            default: throw new InvalidArgumentException('unknown speed unit: ' . $speedUnit);
        }
    }
}
