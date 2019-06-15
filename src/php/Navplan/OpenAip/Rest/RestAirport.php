<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestLength;
use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\OpenAip\Domain\Airport;


class RestAirport {
    public const ROUND_DIGITS_POS = 6;
    public const ROUND_DIGITS_ELEV = 0;


    public static function toRest(Airport $airport): array {
        return array(
            "id" => $airport->id,
            "type" => $airport->type,
            "name" => $airport->name,
            "icao" => $airport->icao,
            "country" => $airport->country,
            "pos" => RestPosition2d::toRest($airport->position, self::ROUND_DIGITS_POS),
            "elevation" => RestLength::toRest($airport->elevation, self::ROUND_DIGITS_ELEV),
            "runways" => array_map(function($rwy) { return RestAirportRunway::toRest($rwy); }, $airport->runways),
            "radios" => array_map(function($radio) { return RestAirportRadio::toRest($radio); }, $airport->radios),
            "webcams" => array_map(function($cam) { return RestWebcam::toRest($cam); }, $airport->webcams),
            "charts" => [],
            "mapfeatures" => array_map(function($feat) { return RestAirportFeature::toRest($feat); }, $airport->mapfeatures)
        );
    }
}
