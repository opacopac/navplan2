<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\VerticalMap\DomainModel\VerticalMapWaypointStep;


class VerticalMapWaypointStepConverter {
    /**
     * @param VerticalMapWaypointStep[] $vmWaypointSteps
     * @return array
     */
    public static function toRest(array $vmWaypointSteps): array {
        return array_map(
            function ($wpStep) {
                return array(
                    "stepIdx" => $wpStep->stepIdx,
                    "alt" => RestLengthConverter::toRest($wpStep->altitudeAmsl)
                );
            },
            $vmWaypointSteps
        );
    }
}
