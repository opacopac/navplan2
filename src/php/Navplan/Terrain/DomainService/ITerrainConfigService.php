<?php declare(strict_types=1);

namespace Navplan\Terrain\DomainService;


interface ITerrainConfigService {
    function getTerrainTilesBaseDir(): string;
}
