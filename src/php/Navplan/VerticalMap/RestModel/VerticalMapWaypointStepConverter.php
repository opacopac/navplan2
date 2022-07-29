<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\DomainModel\VerticalMapWaypointStep;


class VerticalMapWaypointStepConverter {
    public static function toRest(VerticalMapWaypointStep $vmWaypointStep): array {
        return [
            round($vmWaypointStep->altitudeAmsl->getFt()),
            round($vmWaypointStep->horDist->getM())
        ];
    }


    /**
     * @param VerticalMapWaypointStep[] $vmWaypointSteps
     * @return array
     */
    public static function toRestList(array $vmWaypointSteps): array {
        return array_map(
            function ($wpStep) {
                return self::toRest($wpStep);
            },
            $vmWaypointSteps
        );
    }
}
