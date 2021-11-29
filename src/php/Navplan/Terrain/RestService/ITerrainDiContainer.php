<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\Terrain\DomainService\ITerrainService;


interface ITerrainDiContainer {
    function getHttpService(): IHttpService;

    function getTerrainService(): ITerrainService;
}
