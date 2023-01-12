<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;

use InvalidArgumentException;
use Navplan\Common\GeoHelper;


class Line2d implements IGeometry2d {
    /**
     * @param Position2d[] $position2dList
     */
    public function __construct(public array $position2dList) {
        $posCount = count($this->position2dList);
        if ($posCount < 2) {
            throw new InvalidArgumentException("number of positions must be >=2 but was " . $posCount);
        }
    }


    public function calcTotalDist(): Length {
        $routeDistM = 0;
        for ($i = 0; $i < count($this->position2dList) - 1; $i++) {
            $routeDistM += GeoHelper::calcHaversineDistance($this->position2dList[$i], $this->position2dList[$i + 1])->getM();
        }

        return Length::fromM($routeDistM);
    }


    /**
     * @param Length $minStepSize
     * @param int $maxSteps
     * @return Position2d[]
     */
    public function subdividePosList(Length $minStepSize, int $maxSteps): array {
        $stepSizeM = max($minStepSize->getM(), $this->calcTotalDist()->getM() / $maxSteps);

        $subDivPosList = [];
        for ($i = 0; $i < count($this->position2dList) - 1; $i++) {
            $pos1 = $this->position2dList[$i];
            $pos2 = $this->position2dList[$i + 1];
            $legDistM = GeoHelper::calcHaversineDistance($pos1, $pos2)->getM();
            $steps = ceil($legDistM / $stepSizeM);
            $stepSize = $legDistM / $steps;
            $deltaLon = ($pos2->longitude - $pos1->longitude) / $legDistM * $stepSize;
            $deltaLat = ($pos2->latitude - $pos1->latitude) / $legDistM * $stepSize;

            for ($i = 0; $i < $steps; $i++) {
                $subDivPosList[] = new Position2d(
                    $pos1->longitude + $i * $deltaLon,
                    $pos1->latitude + $i * $deltaLat
                );
            }
        }
        $subDivPosList[] = $this->position2dList[count($this->position2dList) - 1]; // "manually" add last pos

        return $subDivPosList;
    }
}
