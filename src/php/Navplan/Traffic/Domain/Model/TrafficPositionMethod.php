<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


use InvalidArgumentException;

class TrafficPositionMethod {
    const FLARM = 1;
    const ADSB = 2;
    const MLAT = 3;
    const OWN = 4;


    public static function toString(int $positionMethod): string {
        switch ($positionMethod) {
            case self::FLARM: return "FLARM";
            case self::ADSB: return "ADSB";
            case self::MLAT: return "MLAT";
            case self::OWN: return "OWN";
            default: throw new InvalidArgumentException('unknown traffic position method ' . $positionMethod);
        }
    }
}
