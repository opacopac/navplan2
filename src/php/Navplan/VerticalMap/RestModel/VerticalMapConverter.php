<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\VerticalMap\DomainModel\VerticalMap;


class VerticalMapConverter {
    public static function toRest(VerticalMap $verticalMap): array {
        return array(
            "mapHeight" => RestLengthConverter::toRest($verticalMap->mapHeight, 0),
            "mapWidth" => RestLengthConverter::toRest($verticalMap->mapWidth, 0),
            "heightUnit" => LengthUnit::FT->value,
            "widthUnit" => LengthUnit::M->value,
            "terrainSteps" => VerticalMapTerrainStepConverter::listToRest($verticalMap->terrainSteps),
            "waypointSteps" => VerticalMapWaypointStepConverter::listToRest($verticalMap->waypointSteps),
            "vmAirspaces" => VerticalMapAirspaceConverter::listToRest($verticalMap->vmAirspaces)
        );
    }
}
