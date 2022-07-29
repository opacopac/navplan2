<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\Domain\Model\AirportRunwayType;


class OpenAipAirportRundwayTypeConverter {
    public static function fromRest(int $restAirportRunwayType): AirportRunwayType {
        return match ($restAirportRunwayType) {
            0 => AirportRunwayType::ASPH,
            1 => AirportRunwayType::CONC,
            2 => AirportRunwayType::GRASS,
            3 => AirportRunwayType::SAND,
            4 => AirportRunwayType::WATER,
            12 => AirportRunwayType::GRAVEL,
            13 => AirportRunwayType::EARTH,
            14 => AirportRunwayType::ICE,
            15 => AirportRunwayType::SNOW,
            default => AirportRunwayType::UNKNOWN,
        };
    }
}
