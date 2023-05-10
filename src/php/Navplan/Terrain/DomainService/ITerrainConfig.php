<?php declare(strict_types=1);

namespace Navplan\Terrain\DomainService;


interface ITerrainConfig {
    function getTerrainTilesBaseDir(): string;
}
