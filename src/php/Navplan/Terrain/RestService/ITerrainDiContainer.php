<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\Terrain\UseCase\ReadElevationList\IReadElevationListUc;


interface ITerrainDiContainer {
    function getHttpService(): IHttpService;

    function getReadElevationListUc(): IReadElevationListUc;
}
