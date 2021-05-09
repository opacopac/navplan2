<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\Webcam\RestModel\RestWebcamConverter;


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
            "pos" => RestPosition2dConverter::toRest($airport->position, self::ROUND_DIGITS_POS),
            "elevation" => RestLengthConverter::toRest($airport->elevation, self::ROUND_DIGITS_ELEV),
            "runways" => array_map(function($rwy) { return RestAirportRunwayConverter::toRest($rwy); }, $airport->runways),
            "radios" => array_map(function($radio) { return RestAirportRadioConverter::toRest($radio); }, $airport->radios),
            "webcams" => array_map(function($cam) { return RestWebcamConverter::toRest($cam); }, $airport->webcams),
            "charts" => array_map(function($chart) { return RestAirportChartConverter::toRest($chart); }, $airport->charts),
            "mapfeatures" => array_map(function($feat) { return RestAirportFeatureConverter::toRest($feat); }, $airport->mapfeatures)
        );
    }


    public static function listToRest(array $airportList): array {
        return array_map(function ($airport) { return self::toRest($airport); }, $airportList);
    }
}
