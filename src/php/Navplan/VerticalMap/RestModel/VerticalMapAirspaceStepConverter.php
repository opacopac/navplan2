<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\DomainModel\VerticalMapAirspaceStep;


class VerticalMapAirspaceStepConverter {
    public static function toRest(VerticalMapAirspaceStep $vmAirspaceStep): array {
        return [
            round($vmAirspaceStep->botAlt->getFt()),
            round($vmAirspaceStep->topAlt->getFt()),
            round($vmAirspaceStep->horDist->getM())
        ];
    }


    /**
     * @param VerticalMapAirspaceStep[] $vmAirspaceSteps
     * @return array
     */
    public static function toRestList(array $vmAirspaceSteps): array {
        return array_map(
            function ($asStep) { return self::toRest($asStep); },
            $vmAirspaceSteps
        );
    }
}
