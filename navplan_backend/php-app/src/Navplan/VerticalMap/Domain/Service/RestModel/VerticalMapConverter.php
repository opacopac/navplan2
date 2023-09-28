<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service\RestModel;

use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoDwd\Rest\Model\RestVerticalCloudColumnConverter;
use Navplan\MeteoDwd\Rest\Model\RestVerticalWindColumnConverter;
use Navplan\VerticalMap\Domain\Model\VerticalMap;


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
            "verticalCloudColumns" => RestVerticalCloudColumnConverter::toRestList($verticalMap->verticalCloudColumns),
            "verticalWindColumns" => RestVerticalWindColumnConverter::toRestList($verticalMap->verticalWindColumns)
        );
    }
}
