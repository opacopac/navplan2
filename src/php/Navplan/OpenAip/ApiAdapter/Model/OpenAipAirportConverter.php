<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\DomainModel\Airport;


class OpenAipAirportConverter {
    public static function fromRest(array $restAirport): Airport {
        return new Airport(
            -1,
            OpenAipAirportTypeConverter::fromRest($restAirport["type"]),
            $restAirport["name"],
            $restAirport["icao_code"] ?? NULL,
            $restAirport["country"],
            OpenAipPositionConverter::fromRestPointGeometry($restAirport["geometry"]),
            OpenAipElevationConverter::fromRest($restAirport["elevation"]),
            [],
            [],
            [],
            [],
            [],
            []
        );
    }


    /**
     * @param array $restAirport
     * @return Airport[]
     */
    public static function fromRestList(array $restAirport): array {
        return array_map(function ($restAirport) { return self::fromRest($restAirport); }, $restAirport);
    }
}
