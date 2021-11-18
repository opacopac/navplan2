<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalMap {
    /**
     * @param Length $mapHeight
     * @param Length $mapWidth
     * @param VerticalMapTerrainStep[] $terrainSteps
     * @param VerticalMapWaypointStep[] $waypointSteps
     * @param VerticalMapAirspace[] $vmAirspaces
     */
    public function __construct(
        public Length $mapHeight,
        public Length $mapWidth,
        public array $terrainSteps,
        public array $waypointSteps,
        public array $vmAirspaces
    ) {
    }
}