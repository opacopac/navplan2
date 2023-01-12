<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoDwd\RestModel\RestVerticalCloudColumnConverter;
use Navplan\VerticalMap\DomainModel\VerticalMap;


class VerticalMapConverter {
    public static function toRest(VerticalMap $verticalMap): array {
        return array(
            "mapHeight" => RestLengthConverter::toRest($verticalMap->mapHeight, 0),
            "mapWidth" => RestLengthConverter::toRest($verticalMap->mapWidth, 0),
            "heightUnit" => LengthUnit::FT->value,
            "widthUnit" => LengthUnit::M->value,
            "terrainSteps" => VerticalMapTerrainStepConverter::toRestList($verticalMap->terrainSteps),
            "waypointSteps" => VerticalMapWaypointStepConverter::toRestList($verticalMap->waypointSteps),
            "vmAirspaces" => VerticalMapAirspaceConverter::toRestList($verticalMap->vmAirspaces),
            "verticalCloudColumns" => RestVerticalCloudColumnConverter::toRestList($verticalMap->verticalCloudColumns)
        );
    }
}
