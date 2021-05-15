<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestModel;

use Navplan\Aerodrome\DomainModel\ShortAirport;
use Navplan\Common\RestModel\RestPosition2dConverter;


class RestShortAirportConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(ShortAirport $airport): array {
        return array(
            "id" => $airport->id,
            "type" => $airport->type,
            "icao" => is_null($airport->icao) ? "" : $airport->icao,
            "pos" => RestPosition2dConverter::toRest($airport->position, self::ROUND_DIGITS_POS),
            "rwy1dir" => $airport->rwy1dir,
            "rwy1sfc" => $airport->rwy1sfc,
            "features" => $airport->featureTypes
        );
    }


    public static function listToRest(array $airportList): array {
        return array_map(function ($airport) { return self::toRest($airport); }, $airportList);
    }
}
