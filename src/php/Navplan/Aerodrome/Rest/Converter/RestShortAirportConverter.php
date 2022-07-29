<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;


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


    public static function toRestList(array $airportList): array {
        return array_map(function ($airport) { return self::toRest($airport); }, $airportList);
    }
}
