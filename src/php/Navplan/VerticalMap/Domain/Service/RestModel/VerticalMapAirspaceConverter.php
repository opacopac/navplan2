<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service\RestModel;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\VerticalMap\Domain\Model\VerticalMapAirspace;


class VerticalMapAirspaceConverter {
    public static function toRest(VerticalMapAirspace $vmAirspace): array {
        return array(
            "airspaceId" => $vmAirspace->airspace->id,
            "airspaceCategory" => $vmAirspace->airspace->category,
            "airspaceName" => $vmAirspace->airspace->name,
            "altBottom" => RestAltitudeConverter::toRest($vmAirspace->airspace->alt_bottom),
            "altTop" => RestAltitudeConverter::toRest($vmAirspace->airspace->alt_top),
            "airspaceSteps" => VerticalMapAirspaceStepConverter::toRestList($vmAirspace->airspaceSteps)
        );
    }


    public static function toRestList(array $vmAirspaces): array {
        return array_map(
            function ($vmAirspace) { return self::toRest($vmAirspace); },
            $vmAirspaces
        );
    }
}
