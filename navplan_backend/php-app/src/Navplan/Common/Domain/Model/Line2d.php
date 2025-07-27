<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;
use Navplan\Common\GeoHelper;


class Line2d implements IGeometry2d {
    /**
     * @param Position2d[] $pos2dList
     */
    public function __construct(public array $pos2dList) {
        $posCount = count($this->pos2dList);
        if ($posCount < 2) {
            throw new InvalidArgumentException("number of positions must be >=2 but was " . $posCount);
        }
    }


    public function calcTotalDist(): Length {
        $routeDistM = 0;
        for ($i = 0; $i < count($this->pos2dList) - 1; $i++) {
            $routeDistM += GeoHelper::calcHaversineDistance($this->pos2dList[$i], $this->pos2dList[$i + 1])->getM();
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
        for ($i = 0; $i < count($this->pos2dList) - 1; $i++) {
            $pos1 = $this->pos2dList[$i];
            $pos2 = $this->pos2dList[$i + 1];
            $legDistM = GeoHelper::calcHaversineDistance($pos1, $pos2)->getM();
            $steps = ceil($legDistM / $stepSizeM);
            $stepSize = $legDistM / $steps;
            $deltaLon = ($pos2->longitude - $pos1->longitude) / $legDistM * $stepSize;
            $deltaLat = ($pos2->latitude - $pos1->latitude) / $legDistM * $stepSize;

            for ($j = 0; $j < $steps; $j++) {
                $subDivPosList[] = new Position2d(
                    $pos1->longitude + $j * $deltaLon,
                    $pos1->latitude + $j * $deltaLat
                );
            }
        }
        $subDivPosList[] = $this->pos2dList[count($this->pos2dList) - 1]; // "manually" add last pos

        return $subDivPosList;
    }
}
