<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainService;

use InvalidArgumentException;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\LineInterval2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\DomainModel\Airspace;
use Navplan\Enroute\DomainService\IAirspaceRepo;
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\VerticalMap\DomainModel\VerticalMap;
use Navplan\VerticalMap\DomainModel\VerticalMapAirspace;
use Navplan\VerticalMap\DomainModel\VerticalMapAirspaceStep;
use Navplan\VerticalMap\DomainModel\VerticalMapTerrainStep;
use Navplan\VerticalMap\DomainModel\VerticalMapWaypointStep;


class VerticalMapService implements IVerticalMapService {
    const TERRAIN_RESOLUTION_M = 100;
    const TERRAIN_MAX_STEPS = 500;
    const MAX_MAP_HEIGHT_ABOVE_MAX_ELEVATION_FT = 4000;
    const WAYPOINT_HEIGHT_ABOVE_MAX_ELEVATION_FT = 2000;


    public function __construct(
        private ITerrainRepo $terrainRepo,
        private IAirspaceRepo $airspaceRepo
    ) {
    }


    public function buildFromWpList(array $wpPositions): VerticalMap {
        $mapWidthM = $this->calcTotalDistM($wpPositions);
        $stepSizeM = max(self::TERRAIN_RESOLUTION_M, $mapWidthM / self::TERRAIN_MAX_STEPS);

        // terain
        $terrainStepPosList = $this->calcTerainStepPosList($wpPositions, $stepSizeM);
        $terrainElevationList = $this->terrainRepo->readElevations($terrainStepPosList);
        $terrainSteps = $this->createVmTerrainSteps($terrainElevationList, Length::fromM($stepSizeM));
        $maxTerrainElevation = $this->getMaxTerrainHeight($terrainSteps);

        // waypoints
        $wpSteps = $this->createWaypointSteps($wpPositions, $maxTerrainElevation);

        // airspaces
        $airspaceCandidates = $this->airspaceRepo->searchByRouteIntersection($wpPositions);
        $vmAirspaces = $this->createVmAirspaces($airspaceCandidates, $wpSteps, $terrainSteps);

        //TODO: notam

        return new VerticalMap(
            $maxTerrainElevation->add(Length::fromFt(self::MAX_MAP_HEIGHT_ABOVE_MAX_ELEVATION_FT)),
            Length::fromM($mapWidthM),
            $terrainSteps,
            $wpSteps,
            $vmAirspaces
        );
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
     * @param float $stepSizeM
     * @return Position2d[]
     */
    private function calcTerainStepPosList(array $wpPosList, float $stepSizeM): array {
        $terrainStepPositions = [];

        for ($i = 0; $i < count($wpPosList) - 1; $i++) {
            $pos1 = $wpPosList[$i];
            $pos2 = $wpPosList[$i + 1];
            $legDistM = GeoHelper::calcHaversineDistance($pos1, $pos2)->getValue(LengthUnit::M);
            $steps = ceil($legDistM / $stepSizeM);
            $stepSize = $legDistM / $steps;
            $deltaLon = ($pos2->longitude - $pos1->longitude) / $legDistM * $stepSize;
            $deltaLat = ($pos2->latitude - $pos1->latitude) / $legDistM * $stepSize;

            for ($j = 0; $j < $steps; $j++) {
                $terrainStepPositions[] = new Position2d(
                    $pos1->longitude + $j * $deltaLon,
                    $pos1->latitude + $j * $deltaLat
                );
            }
        }

        $terrainStepPositions[] = $wpPosList[count($wpPosList) - 1]; // "manually" add last pos

        return $terrainStepPositions;
    }


    /**
     * @param Position3d[] $terrainElevationList
     * @param Length $stepDist
     * @return VerticalMapTerrainStep[]
     */
    private function createVmTerrainSteps(array $terrainElevationList, Length $stepDist): array {
        $terrainSteps = [];
        $maxElevationFt = 0;
        for ($i = 0; $i < count($terrainElevationList); $i++) {
            $elevation = $terrainElevationList[$i]->altitude->getHeightAmsl();
            if ($elevation->getFt() > $maxElevationFt) {
                $maxElevationFt = $elevation->getFt();
            }
            $terrainSteps[] = new VerticalMapTerrainStep($elevation, $stepDist->mult($i));
        }

        return $terrainSteps;
    }


    /**
     * @param VerticalMapTerrainStep[] $terrainSteps
     * @return Length
     */
    private function getMaxTerrainHeight(array $terrainSteps): Length {
        $maxElevationFt = 0;
        for ($i = 0; $i < count($terrainSteps); $i++) {
            $elevationFt = $terrainSteps[$i]->elevationAmsl->getFt();
            if ($elevationFt > $maxElevationFt) {
                $maxElevationFt = $elevationFt;
            }
        }

        return new Length($maxElevationFt, LengthUnit::FT);
    }


    /**
     * @param Position2d[] $wpPositions
     * @return VerticalMapWaypointStep[]
     */
    public function createWaypointSteps(array $wpPositions, Length $maxTerrainElevation): array {
        if (count($wpPositions) < 2) {
            throw new InvalidArgumentException("ERROR: number of waypoints must be 2 or greater!");
        }

        $altAmsl = $maxTerrainElevation->add(new Length(self::WAYPOINT_HEIGHT_ABOVE_MAX_ELEVATION_FT, LengthUnit::FT));
        $wpSteps = [];
        for ($i = 0; $i < count($wpPositions); $i++) {
            $horDist = $i === 0 ? Length::createZero() : GeoHelper::calcHaversineDistance($wpPositions[$i - 1], $wpPositions[$i]);
            $wpSteps[] = new VerticalMapWaypointStep($wpPositions[$i], $horDist, $altAmsl);
        }

        return $wpSteps;
    }


    /**
     * @param Airspace[] $airspaceCandidates
     * @param VerticalMapWaypointStep[] $wpSteps
     * @param VerticalMapTerrainStep[] $terrainSteps
     * @return VerticalMapAirspace[]
     */
    public function createVmAirspaces(array $airspaceCandidates, array $wpSteps, array $terrainSteps): array {
        $vmAirspaces = [];

        foreach ($airspaceCandidates as $airspace) {
            $vmAirspace = new VerticalMapAirspace($airspace);
            $vmAirspaces[] = $vmAirspace;

            $isPosInside = $airspace->polygon->containsPoint($wpSteps[0]->wpPosition);
            if ($isPosInside) {
                $inPos = [0, Length::createZero()];
            }

            for ($i = 1; $i < count($wpSteps); $i++) {
                $wpInterval = new LineInterval2d($wpSteps[$i - 1]->wpPosition, $wpSteps[$i]->wpPosition);
                $intersections = $airspace->polygon->calcIntersectionPoints($wpInterval);
                foreach ($intersections as $intersection) {
                    $horDist = $wpSteps[$i - 1]->horDist->add(GeoHelper::calcHaversineDistance($wpSteps[$i - 1]->wpPosition, $intersection));
                    $isPosInside = !$isPosInside;
                    if ($isPosInside) {
                        $inPos = [$i, $horDist];
                    } else {
                        $this->createVmAirspaceStep(
                            $vmAirspace,
                            $airspace,
                            $wpSteps[$inPos[0]],
                            $inPos[1],
                            $wpSteps[$i - 1],
                            $horDist,
                            $terrainSteps
                        );

                        $vmAirspace = new VerticalMapAirspace($airspace);
                        $vmAirspaces[] = $vmAirspace;
                    }
                }
            }

            if ($isPosInside) {
                $lastWpStep = $wpSteps[count($wpSteps) - 1];
                $this->createVmAirspaceStep(
                    $vmAirspace,
                    $airspace,
                    $wpSteps[$inPos[0]],
                    $inPos[1],
                    $lastWpStep,
                    Length::createZero(),
                    $terrainSteps
                );
            }
        }

        return $vmAirspaces;
    }


    /**
     * @param VerticalMapAirspace $vmAirspace
     * @param Airspace $airspace
     * @param VerticalMapWaypointStep $wpStepIn
     * @param Length $horDistIn
     * @param VerticalMapWaypointStep $wpStepOut
     * @param Length $horDistOut
     * @param VerticalMapTerrainStep[] $terrainSteps
     */
    private function createVmAirspaceStep(
        VerticalMapAirspace &$vmAirspace,
        Airspace $airspace,
        VerticalMapWaypointStep $wpStepIn,
        Length $horDistIn,
        VerticalMapWaypointStep $wpStepOut,
        Length $horDistOut,
        array $terrainSteps
    ): void {
        $horDistInTot = $wpStepIn->horDist->add($horDistIn);
        $horDistOutTot = $wpStepOut->horDist->add($horDistOut);
        if ($airspace->alt_bottom->reference === AltitudeReference::GND || $airspace->alt_top->reference === AltitudeReference::GND) {
            $isIn = false;
            foreach ($terrainSteps as $terrainStep) {
                if ($terrainStep->horDist->isGtOrEqThan($horDistInTot)) {
                    $isIn = true;
                } else if ($terrainStep->horDist->isGtThan($horDistOut)) {
                    break;
                }
                if ($isIn) {
                    $vmAirspace->airspaceSteps[] = new VerticalMapAirspaceStep(
                        $airspace->alt_top->getHeightAmsl($terrainStep->elevationAmsl),
                        $airspace->alt_bottom->getHeightAmsl($terrainStep->elevationAmsl),
                        $terrainStep->horDist
                    );
                }
            }
        } else {
            $vmAirspace->airspaceSteps[] = new VerticalMapAirspaceStep(
                $airspace->alt_top->getHeightAmsl(),
                $airspace->alt_bottom->getHeightAmsl(),
                $horDistInTot
            );
            $vmAirspace->airspaceSteps[] = new VerticalMapAirspaceStep(
                $airspace->alt_top->getHeightAmsl(),
                $airspace->alt_bottom->getHeightAmsl(),
                $horDistOutTot
            );
        }
    }
}
