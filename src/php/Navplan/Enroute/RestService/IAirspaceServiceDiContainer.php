<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\Enroute\DomainService\IAirspaceRepo;
use Navplan\System\DomainService\IHttpService;


interface IAirspaceServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirspaceRepo(): IAirspaceRepo;
}
