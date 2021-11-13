<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\DomainModel\VerticalMapAirspace;


class VerticalMapAirspaceConverter {
    public static function toRest(VerticalMapAirspace $vmAirspace): array {
        return array(
            "airspaceId" => $vmAirspace->airspace->id,
            "airspaceSteps" => VerticalMapAirspaceStepConverter::listToRest($vmAirspace->airspaceSteps)
        );
    }


    public static function listToRest(array $vmAirspaces): array {
        return array_map(
            function ($vmAirspace) { return self::toRest($vmAirspace); },
            $vmAirspaces
        );
    }
}
