<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Aerodrome\Domain\Model\AirportType;


class OpenAipAirportTypeConverter {
    public static function fromRest(int $restAirportType): AirportType {
        return match ($restAirportType) {
            0 => AirportType::AF_MIL_CIVIL,
            1 => AirportType::GLIDING,
            2 => AirportType::AF_CIVIL,
            3 => AirportType::INTL_APT,
            4 => AirportType::HELI_MIL,
            5 => AirportType::AD_MIL,
            6 => AirportType::LIGHT_AIRCRAFT,
            7 => AirportType::HELI_CIVIL,
            8 => AirportType::AD_CLOSED,
            9 => AirportType::APT,
            10 => AirportType::AF_WATER,
            11 => AirportType::LDG_STRIP,
            12 => AirportType::AGRI_STRIP,
            13 => AirportType::ALTIPORT,
            default => throw new InvalidArgumentException("unknown airport type '" . $restAirportType . "'"),
        };
    }
}
