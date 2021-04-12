<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;

use InvalidArgumentException;


class AltitudeReference {
    const GND = 1;
    const MSL = 2;
    const STD = 3;


    public static function fromString(string $altRefString): int {
        switch(trim(strtoupper($altRefString))) {
            case 'GND': return self::GND;
            case 'MSL': return self::MSL;
            case 'STD': return self::STD;
            default: throw new InvalidArgumentException('unknown altitude reference: ' . $altRefString);
        }
    }


    public static function toString(int $altRef): string {
        switch($altRef) {
            case self::GND: return 'GND';
            case self::MSL: return 'MSL';
            case self::STD: return 'STD';
            default: throw new InvalidArgumentException('unknown altitude reference: ' . $altRef);
        }
    }
}
