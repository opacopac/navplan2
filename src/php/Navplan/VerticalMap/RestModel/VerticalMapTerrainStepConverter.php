<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\VerticalMap\DomainModel\VerticalMapTerrainStep;


class VerticalMapTerrainStepConverter {
    public static function toRest(VerticalMapTerrainStep $vmTerrainStep): array {
        return [
            round($vmTerrainStep->elevationAmsl->getFt()),
            round($vmTerrainStep->horDist->getM())
        ];
    }


    /**
     * @param VerticalMapTerrainStep[] $vmTerrainSteps
     * @return array
     */
    public static function listToRest(array $vmTerrainSteps): array {
        return array_map(
            function ($terrainStep) {
                return self::toRest($terrainStep);
            },
            $vmTerrainSteps
        );
    }
}
