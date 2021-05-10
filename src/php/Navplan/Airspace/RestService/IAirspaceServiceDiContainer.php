<?php declare(strict_types=1);

namespace Navplan\Airspace\RestService;

use Navplan\Airspace\DomainService\IAirspaceRepo;
use Navplan\System\DomainService\IHttpService;


interface IAirspaceServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirspaceRepo(): IAirspaceRepo;
}
