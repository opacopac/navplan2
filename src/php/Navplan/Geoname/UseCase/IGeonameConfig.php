<?php declare(strict_types=1);

namespace Navplan\Geoname\UseCase;

use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;


interface IGeonameConfig extends ITerrainConfig {
    function getGeonameRepo(): IGeonameRepo;

    function getTerrainRepo(): ITerrainRepo;
}
