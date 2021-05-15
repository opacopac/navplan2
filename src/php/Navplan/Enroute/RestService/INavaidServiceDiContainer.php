<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\Enroute\DomainService\INavaidRepo;
use Navplan\System\DomainService\IHttpService;


interface INavaidServiceDiContainer {
    function getHttpService(): IHttpService;

    function getNavaidRepo(): INavaidRepo;
}
