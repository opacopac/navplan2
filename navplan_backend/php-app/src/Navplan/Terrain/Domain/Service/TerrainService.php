<?php declare(strict_types=1);

namespace Navplan\Terrain\Domain\Service;


class TerrainService implements ITerrainService {
    public function __construct(private ITerrainRepo $repo) {
    }


    function readElevations(array $positionList): array {
        return $this->repo->readElevations($positionList);
    }
}
