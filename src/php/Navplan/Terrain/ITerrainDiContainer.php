<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\Terrain\Domain\Service\ITerrainService;


interface ITerrainDiContainer {
    function getTerrainService(): ITerrainService;
}
