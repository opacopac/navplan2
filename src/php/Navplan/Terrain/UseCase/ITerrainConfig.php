<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase;


interface ITerrainConfig {
    function getTerrainRepo(): ITerrainRepo;
}
