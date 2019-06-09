<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


use InvalidArgumentException;

class TrafficDataSource {
    const OGN = 1;
    const ADSBX = 2;
    const ADSBX2 = 3;
    const OPENSKY = 4;


    public static function toString(int $trafficSource): string {
        switch ($trafficSource) {
            case self::OGN: return "OGN";
            case self::ADSBX: return "ADSBX";
            case self::ADSBX2: return "ADSBX2";
            case self::OPENSKY: return "OPENSKY";
            default: throw new InvalidArgumentException('unknown traffic source ' . $trafficSource);
        }
    }
}
