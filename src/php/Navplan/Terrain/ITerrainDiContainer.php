<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\Terrain\DomainService\ITerrainService;


interface ITerrainDiContainer {
    function getTerrainService(): ITerrainService;
}
