<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Shared\GeoService;


class ReadElevationList {
    const RESOLUTION_M = 100;
    const MAX_STEPS = 500;

    /* @var $repo ITerrainRepo */
    private $repo;


    public function __construct(ITerrainRepo $repo) {
        $this->repo = $repo;
    }


    public function read(array $posList): array {
        if (count($posList) === 0) {
            return [];
        } else if (count($posList) === 1) {
            return $this->repo->readElevation($posList);
        }

        $totalDist = $this->calcTotalDist($posList);
        $minStepSizeM = max(self::RESOLUTION_M, $totalDist / self::MAX_STEPS);
        $elevationPosList = $this->getElevationPosList($posList, $minStepSizeM);

        return $this->repo->readElevation($elevationPosList);
    }


    private function calcTotalDist(array $positionList): float {
        $routeDist = 0;
        for ($i = 0; $i < count($positionList) - 1; $i++) {
            $routeDist += GeoService::calcDistanceMeters($positionList[$i], $positionList[$i + 1]);
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
        $legDistM = GeoService::calcDistanceMeters($pos1, $pos2);
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
