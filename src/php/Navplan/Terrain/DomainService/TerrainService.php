<?php declare(strict_types=1);

namespace Navplan\Terrain\DomainService;

use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\GeoHelper;


class TerrainService implements ITerrainService {
    const RESOLUTION_M = 100;
    const MAX_STEPS = 500;


    public function __construct(private ITerrainRepo $repo) {
    }



    function readElevations(array $positionList): array {
        return $this->repo->readElevations($positionList);
    }



    public function readRouteElevations(array $waypointPosList): array {
        if (count($waypointPosList) === 0) {
            return [];
        } else if (count($waypointPosList) === 1) {
            return $this->repo->readElevations($waypointPosList);
        }

        $totalDistM = $this->calcTotalDistM($waypointPosList);
        $minStepSizeM = max(self::RESOLUTION_M, $totalDistM / self::MAX_STEPS);
        $elevationPosList = $this->getElevationPosList($waypointPosList, $minStepSizeM);

        return $this->repo->readElevations($elevationPosList);
    }


    private function calcTotalDistM(array $positionList): float {
        $routeDist = 0;
        for ($i = 0; $i < count($positionList) - 1; $i++) {
            $routeDist += GeoHelper::calcHaversineDistance($positionList[$i], $positionList[$i + 1])->getValue(LengthUnit::M);
        }

        return $routeDist;
    }


    private function getElevationPosList(array $positionList, float $minStepSizeM): array {
        $elevationPosList = [];

        for ($i = 0; $i < count($positionList) - 1; $i++) {
            $this->addLegPosList($elevationPosList, $positionList[$i], $positionList[$i + 1], $minStepSizeM);
        }
        $elevationPosList[] = $positionList[count($positionList) - 1]; // "manually" add last pos

        return $elevationPosList;
    }


    private function addLegPosList(array &$elevationPosList, Position2d $pos1, Position2d $pos2, float $minStepSizeM) {
        $legDistM = GeoHelper::calcHaversineDistance($pos1, $pos2)->getValue(LengthUnit::M);
        $steps = ceil($legDistM / $minStepSizeM);
        $stepSize = $legDistM / $steps;
        $deltaLon = ($pos2->longitude - $pos1->longitude) / $legDistM * $stepSize;
        $deltaLat = ($pos2->latitude - $pos1->latitude) / $legDistM * $stepSize;

        for ($i = 0; $i < $steps; $i++) {
            $elevationPosList[] = new Position2d(
                $pos1->longitude + $i * $deltaLon,
                $pos1->latitude + $i * $deltaLat
            );
        }
    }
}
