<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\DomainService\VerticalMapService;


class ProdVerticalMapDiContainer implements IVerticalMapDiContainer {
    private IVerticalMapService $verticalMapService;


    public function __construct(
        private ITerrainService $terrainService,
        private IAirspaceService $airspaceService
    ) {
    }


    function getVerticalMapService(): IVerticalMapService {
        if (!isset($this->verticalMapService)) {
            $this->verticalMapService = new VerticalMapService(
                $this->terrainService,
                $this->airspaceService
            );
        }

        return $this->verticalMapService;
    }
}
