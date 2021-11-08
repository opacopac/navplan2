<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\VerticalMap\DomainModel\VerticalMap;


class VerticalMapConverter {
    public static function toRest(VerticalMap $verticalMap): array {
        return array(
            "maxMapHeight" => RestLengthConverter::toRest($verticalMap->maxMapHeight),
            "stepPositions" => array_map(
                function ($position) { return RestPosition2dConverter::toRest($position); },
                $verticalMap->stepPositions
            ),
            "terrainSteps" => VerticalMapTerrainStepConverter::toRest($verticalMap->terrainSteps),
            "waypointSteps" => VerticalMapWaypointStepConverter::toRest($verticalMap->waypointSteps),
            "airspaces" => array_map(
                function ($vmAirspace) { return VerticalMapAirspaceConverter::toRest($vmAirspace); },
                $verticalMap->airspaces
            )
        );
    }
}
