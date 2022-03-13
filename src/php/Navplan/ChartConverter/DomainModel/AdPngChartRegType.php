<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;

use InvalidArgumentException;


class AdPngChartRegType {
    const ARP = 1;
    const POS1 = 2;


    public static function fromString(string $regTypeString): int {
        switch (trim(strtoupper($regTypeString))) {
            case 'ARP':
                return self::ARP;
            case 'POS1':
                return self::POS1;
            default:
                throw new InvalidArgumentException('unknown ad chart registration type ' . $regTypeString);
        }
    }
}
