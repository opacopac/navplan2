<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\DomainModel\Airspace;


class VerticalMap {
    const RESOLUTION_M = 100;
    const MAX_STEPS = 500;
    const MAX_MAP_HEIGHT_ABOVE_MAX_ELEVATION_FT = 4000;
    const WAYPOINT_HEIGHT_ABOVE_MAX_ELEVATION_FT = 2000;


    /**
     * @var Position2d[]
     */
    public array $stepPositions = [];
    /**
     * @var VerticalMapTerrainStep[]
     */
    public array $terrainSteps = [];
    /**
     * @var VerticalMapWaypointStep[]
     */
    public array $waypointSteps = [];
    /**
     * @var VerticalMapAirspace[]
     */
    public array $airspaces = [];
    public Length $maxTerrainElevation;
    public Length $maxMapHeight;


    /**
     * @param Position2d[] $wpPositions
     */
    public function __construct(array $wpPositions) {
        if (count($wpPositions) < 2) {
            throw new InvalidArgumentException("ERROR: number of waypoints must be 2 or greater!");
        }

        $totalDistM = $this->calcTotalDistM($wpPositions);
        $minStepSizeM = max(self::RESOLUTION_M, $totalDistM / self::MAX_STEPS);
        $this->createStepPosList($wpPositions, $minStepSizeM);
    }


    /**
     * @param Position3d[] $terrainPosList
     */
    public function createVmTerrainSteps(array $terrainPosList): void {
        if (count($terrainPosList) !== count($this->stepPositions)) {
            throw new InvalidArgumentException("ERROR: number of terrain positions must equal number of steps!");
        }

        $this->terrainSteps = [];
        $zeroLength = Length::createZero();
        $maxValue = $zeroLength;
        for ($i = 0; $i < count($terrainPosList); $i++) {
            $elevation = $terrainPosList[$i]->altitude->getHeightAmsl($zeroLength);
            if ($elevation->value > $maxValue->value) {
                $maxValue = $elevation;
            }
            $this->terrainSteps[] = new VerticalMapTerrainStep($elevation);
        }

        // set max elevation, map height
        $this->maxTerrainElevation = $maxValue;
        $this->maxMapHeight = new Length(
            $maxValue->getValue(LengthUnit::FT) + self::MAX_MAP_HEIGHT_ABOVE_MAX_ELEVATION_FT,
            LengthUnit::FT
        );

        // update waypoint heights
        $wpHeight = new Length(
            $maxValue->getValue(LengthUnit::FT) + self::WAYPOINT_HEIGHT_ABOVE_MAX_ELEVATION_FT,
            LengthUnit::FT
        );
        array_walk(
            $this->waypointSteps,
            function (&$wpStep) use ($wpHeight) {
                $wpStep->altitudeAmsl = $wpHeight;
            }
        );
    }


    /**
     * @param Airspace[] $allAirspaces
     */
    public function createVmAirspaces(array $allAirspaces): void {
        foreach ($allAirspaces as $airspace) {
            $isPosInside = false;
            $vmAirspace = new VerticalMapAirspace($airspace);

            for ($i = 0; $i < count($this->stepPositions); $i++) {
                $pos = $this->stepPositions[$i];
                $elevation = $this->terrainSteps[$i]->elevationAmsl;

                if ($airspace->polygon->containsPoint($pos)) {
                    if (!$isPosInside) {
                        $isPosInside = true;
                    }
                    $vmAirspace->airspaceSteps[] = new VerticalMapAirspaceStep(
                        $i,
                        $airspace->alt_top->getHeightAmsl($elevation),
                        $airspace->alt_bottom->getHeightAmsl($elevation)
                    );
                } else {
                    if ($isPosInside) {
                        $isPosInside = false;
                        $this->airspaces[] = $vmAirspace;
                        $vmAirspace = new VerticalMapAirspace($airspace);
                    }
                }
            }
        }
    }


    /**
     * @param Position2d[] $positionList
     * @return float
     */
    private function calcTotalDistM(array $positionList): float {
        $routeDist = 0;
        for ($i = 0; $i < count($positionList) - 1; $i++) {
            $routeDist += GeoHelper::calcHaversineDistance($positionList[$i], $positionList[$i + 1])->getValue(LengthUnit::M);
        }

        return $routeDist;
    }


    /**
     * @param Position2d[] $wpPosList
     * @param float $minStepSizeM
     */
    private function createStepPosList(array $wpPosList, float $minStepSizeM): void {
        $initialWpHeight = Length::createZero();

        for ($i = 0; $i < count($wpPosList) - 1; $i++) {
            // add waypoint position
            $this->waypointSteps[] = new VerticalMapWaypointStep(
                count($this->stepPositions),
                $initialWpHeight
            );

            // add step positions
            $pos1 = $wpPosList[$i];
            $pos2 = $wpPosList[$i + 1];
            $legDistM = GeoHelper::calcHaversineDistance($pos1, $pos2)->getValue(LengthUnit::M);
            $steps = ceil($legDistM / $minStepSizeM);
            $stepSize = $legDistM / $steps;
            $deltaLon = ($pos2->longitude - $pos1->longitude) / $legDistM * $stepSize;
            $deltaLat = ($pos2->latitude - $pos1->latitude) / $legDistM * $stepSize;

            for ($j = 0; $j < $steps; $j++) {
                $this->stepPositions[] = new Position2d(
                    $pos1->longitude + $j * $deltaLon,
                    $pos1->latitude + $j * $deltaLat
                );
            }
        }

        $this->stepPositions[] = $wpPosList[count($wpPosList) - 1]; // "manually" add last pos
    }
}
