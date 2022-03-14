<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;

use InvalidArgumentException;


class AdPngChartRegType {
    const ARP = 1;
    const POS1 = 2;
    const POS1POS2 = 3;


    public static function fromString(string $regTypeString): int {
        switch (trim(strtoupper($regTypeString))) {
            case 'ARP':
                return self::ARP;
            case 'POS1':
                return self::POS1;
            case 'POS1POS2':
                return self::POS1POS2;
            default:
                throw new InvalidArgumentException('unknown ad chart registration type ' . $regTypeString);
        }
    }
}
