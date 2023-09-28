<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


use InvalidArgumentException;

class TrafficAddressType {
    const RANDOM = 1;
    const ICAO = 2;
    const FLARM = 3;
    const OGN = 4;


    public static function fromString(string $addressTypeString): int {
        switch (trim(strtoupper($addressTypeString))) {
            case "RANDOM": return self::RANDOM;
            case "ICAO": return self::ICAO;
            case "FLARM": return self::FLARM;
            case "OGN": return self::OGN;
            default: throw new InvalidArgumentException('unknown traffic address type ' . $addressTypeString);
        }
    }


    public static function toString(int $addressType): string {
        switch ($addressType) {
            case self::RANDOM: return "RANDOM";
            case self::ICAO: return "ICAO";
            case self::FLARM: return "FLARM";
            case self::OGN: return "OGN";
            default: throw new InvalidArgumentException('unknown traffic address type ' . $addressType);
        }
    }
}
