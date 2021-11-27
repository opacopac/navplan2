<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\Enroute\DomainService\INavaidService;
use Navplan\System\DomainService\IHttpService;


interface INavaidServiceDiContainer {
    function getHttpService(): IHttpService;

    function getNavaidService(): INavaidService;
}
