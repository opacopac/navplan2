<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\OpenAip\Domain\Airport;


class AirportRest {
    public static function toArray(Airport $airport): array {
        return array(
            "id" => $airport->id,
            "type" => $airport->type,
            "name" => $airport->name,
            "icao" => $airport->icao,
            "country" => $airport->country,
            "latitude" => RestHelper::reduceDegAccuracy($airport->position->latitude, "AIRPORT"),
            "longitude" => RestHelper::reduceDegAccuracy($airport->position->longitude, "AIRPORT"),
            "elevation" => $airport->elevation,
            "runways" => array_map(function($rwy) { return AirportRunwayRest::toArray($rwy); }, $airport->runways),
            "radios" => array_map(function($radio) { return AirportRadioRest::toArray($radio); }, $airport->radios),
            "webcams" => array_map(function($cam) { return AirportWebcamRest::toArray($cam); }, $airport->webcams),
            "charts" => [],
            "mapfeatures" => array_map(function($feat) { return AirportFeatureRest::toArray($feat); }, $airport->mapfeatures)
        );
    }
}
