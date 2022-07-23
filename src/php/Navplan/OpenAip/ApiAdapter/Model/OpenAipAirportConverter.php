<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\DomainModel\Airport;


class OpenAipAirportConverter {
    public static function fromRest(array $restAirport): Airport {
        return new Airport(
            -1,
            OpenAipAirportTypeConverter::fromRest($restAirport["type"]),
            $restAirport["name"],
            $restAirport["icaoCode"] ?? NULL,
            $restAirport["country"],
            OpenAipPositionConverter::fromRestPointGeometry($restAirport["geometry"]),
            OpenAipElevationConverter::fromRest($restAirport["elevation"]),
            isset($restAirport["runways"]) ? OpenAipAirportRunwayConverter::fromRestList($restAirport["runways"]) : [],
            isset($restAirport["frequencies"]) ? OpenAipAirportRadioConverter::fromRestList($restAirport["frequencies"]) : [],
            [],
            [],
            [],
            []
        );
    }


    /**
     * @param array $restAirports
     * @return Airport[]
     */
    public static function fromRestList(array $restAirports): array {
        return array_map(function ($restAirport) { return self::fromRest($restAirport); }, $restAirports);
    }
}
