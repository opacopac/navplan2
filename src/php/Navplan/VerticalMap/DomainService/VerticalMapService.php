<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainService;

use Navplan\Enroute\DomainService\IAirspaceRepo;
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\VerticalMap\DomainModel\VerticalMap;


class VerticalMapService implements IVerticalMapService {
    public function __construct(
        private ITerrainRepo $terrainRepo,
        private IAirspaceRepo $airspaceRepo
    ) {
    }


    public function buildFromWpList(array $wpPositions): VerticalMap {
        $verticalMap = new VerticalMap($wpPositions);

        $terrainPosList = $this->terrainRepo->readElevation($verticalMap->stepPositions);
        $verticalMap->createVmTerrainSteps($terrainPosList);

        $allAirspaces = $this->airspaceRepo->searchByRouteIntersection($wpPositions);
        $verticalMap->createVmAirspaces($allAirspaces);

        // TODO: notam

        return $verticalMap;
    }
}
