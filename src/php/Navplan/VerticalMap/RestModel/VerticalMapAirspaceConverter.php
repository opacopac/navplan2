<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\DomainModel\VerticalMapAirspace;


class VerticalMapAirspaceConverter {
    public static function toRest(VerticalMapAirspace $vmAirspace): array {
        return array(
            "airspaceId" => $vmAirspace->airspace->id,
            "steps" => array_map(
                function ($asStep) { return VerticalMapAirspaceStepConverter::toRest($asStep); },
                $vmAirspace->airspaceSteps
            )
        );
    }
}
