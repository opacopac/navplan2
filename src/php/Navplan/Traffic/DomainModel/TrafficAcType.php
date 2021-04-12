<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;


use InvalidArgumentException;

class TrafficAcType {
    const HELICOPTER_ROTORCRAFT = 1;
    const GLIDER = 2;
    const PARACHUTE = 3;
    const HANG_GLIDER = 4;
    const PARA_GLIDER = 5;
    const BALLOON = 6;
    const AIRSHIP = 7;
    const UNKNOWN = 8;
    const STATIC_OBJECT = 9;
    const DROP_PLANE = 10;
    const UFO = 11;
    const UAV = 12;
    const JET_AIRCRAFT = 13;
    const POWERED_AIRCRAFT = 14;
    const TOW_PLANE = 15;


    public static function fromString(string $acTypeString): int {
        switch (trim(strtoupper($acTypeString))) {
            case "HELICOPTER_ROTORCRAFT": return self::HELICOPTER_ROTORCRAFT;
            case "GLIDER": return self::GLIDER;
            case "PARACHUTE": return self::PARACHUTE;
            case "HANG_GLIDER": return self::HANG_GLIDER;
            case "PARA_GLIDER": return self::PARA_GLIDER;
            case "BALLOON": return self::BALLOON;
            case "AIRSHIP": return self::AIRSHIP;
            case "UNKNOWN": return self::UNKNOWN;
            case "STATIC_OBJECT": return self::STATIC_OBJECT;
            case "DROP_PLANE": return self::DROP_PLANE;
            case "UFO": return self::UFO;
            case "UAV": return self::UAV;
            case "JET_AIRCRAFT": return self::JET_AIRCRAFT;
            case "POWERED_AIRCRAFT": return self::POWERED_AIRCRAFT;
            case "TOW_PLANE": return self::TOW_PLANE;
            default: throw new InvalidArgumentException('unknown traffic ac type ' . $acTypeString);
        }
    }


    public static function toString(int $acType): string {
        switch ($acType) {
            case self::HELICOPTER_ROTORCRAFT: return "HELICOPTER_ROTORCRAFT";
            case self::GLIDER: return "GLIDER";
            case self::PARACHUTE: return "PARACHUTE";
            case self::HANG_GLIDER: return "HANG_GLIDER";
            case self::PARA_GLIDER: return "PARA_GLIDER";
            case self::BALLOON: return "BALLOON";
            case self::AIRSHIP: return "AIRSHIP";
            case self::UNKNOWN: return "UNKNOWN";
            case self::STATIC_OBJECT: return "STATIC_OBJECT";
            case self::DROP_PLANE: return "DROP_PLANE";
            case self::UFO: return "UFO";
            case self::UAV: return "UAV";
            case self::JET_AIRCRAFT: return "JET_AIRCRAFT";
            case self::POWERED_AIRCRAFT: return "POWERED_AIRCRAFT";
            case self::TOW_PLANE: return "TOW_PLANE";
            default: throw new InvalidArgumentException('unknown traffic ac type ' . $acType);
        }
    }
}
