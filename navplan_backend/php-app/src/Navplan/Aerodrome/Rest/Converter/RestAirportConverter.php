<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChart2Converter;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChartConverter;
use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class RestAirportConverter {
    public const ROUND_DIGITS_POS = 6;
    public const ROUND_DIGITS_ELEV = 0;


    public static function toRest(Airport $airport): array {
        return array(
            "id" => $airport->id,
            "type" => $airport->type->value,
            "name" => $airport->name,
            "icao" => $airport->icao,
            "country" => $airport->country,
            "pos" => RestPosition2dConverter::toRest($airport->position, self::ROUND_DIGITS_POS),
            "elevation" => RestAltitudeConverter::toRest($airport->elevation, self::ROUND_DIGITS_ELEV),
            "runways" => array_map(function($rwy) { return RestAirportRunwayConverter::toRest($rwy); }, $airport->runways),
            "radios" => array_map(function($radio) { return RestAirportRadioConverter::toRest($radio); }, $airport->radios),
            "webcams" => array_map(function($cam) { return RestWebcamConverter::toRest($cam); }, $airport->webcams),
            "charts" => array_map(function($chart) { return RestAirportChartConverter::toRest($chart); }, $airport->charts),
            "charts2" => array_map(function($chart2) { return RestAirportChart2Converter::toRest($chart2); }, $airport->charts2),
            "mapfeatures" => array_map(function($feat) { return RestAirportFeatureConverter::toRest($feat); }, $airport->mapfeatures)
        );
    }


    public static function toRestList(array $airportList): array {
        return array_map(function ($airport) { return self::toRest($airport); }, $airportList);
    }
}
