<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Geometry\RestModel\LengthConverter;
use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\OpenAip\RestModel\WebcamConverter;


class RestAirportConverter {
    public const ROUND_DIGITS_POS = 6;
    public const ROUND_DIGITS_ELEV = 0;


    public static function toRest(Airport $airport): array {
        return array(
            "id" => $airport->id,
            "type" => $airport->type,
            "name" => $airport->name,
            "icao" => $airport->icao,
            "country" => $airport->country,
            "pos" => Position2dConverter::toRest($airport->position, self::ROUND_DIGITS_POS),
            "elevation" => LengthConverter::toRest($airport->elevation, self::ROUND_DIGITS_ELEV),
            "runways" => array_map(function($rwy) { return RestAirportRunwayConverter::toRest($rwy); }, $airport->runways),
            "radios" => array_map(function($radio) { return RestAirportRadioConverter::toRest($radio); }, $airport->radios),
            "webcams" => array_map(function($cam) { return WebcamConverter::toRest($cam); }, $airport->webcams),
            "charts" => array_map(function($chart) { return RestAirportChartConverter::toRest($chart); }, $airport->charts),
            "mapfeatures" => array_map(function($feat) { return RestAirportFeatureConverter::toRest($feat); }, $airport->mapfeatures)
        );
    }
}
