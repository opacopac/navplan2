<?php declare(strict_types=1);

namespace Navplan\Terrain\Domain\Service;


interface ITerrainConfig {
    function getTerrainTilesBaseDir(): string;
}
