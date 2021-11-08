<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\VerticalMap\DomainModel\VerticalMapTerrainStep;


class VerticalMapTerrainStepConverter {
    /**
     * @param VerticalMapTerrainStep[] $vmTerrainSteps
     * @return array
     */
    public static function toRest(array $vmTerrainSteps): array {
        return array_map(
            function ($terrainStep) {
                return array(
                    "elev" => RestLengthConverter::toRest($terrainStep->elevationAmsl)
                );
            },
            $vmTerrainSteps
        );
    }
}
