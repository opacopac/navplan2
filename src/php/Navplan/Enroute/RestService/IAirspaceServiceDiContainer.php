<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\Enroute\DomainService\IAirspaceService;
use Navplan\System\DomainService\IHttpService;


interface IAirspaceServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirspaceService(): IAirspaceService;
}
