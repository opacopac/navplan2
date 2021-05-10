<?php declare(strict_types=1);

namespace Navplan\Navaid\RestService;

use Navplan\Navaid\DomainService\INavaidRepo;
use Navplan\System\DomainService\IHttpService;


interface INavaidServiceDiContainer {
    function getHttpService(): IHttpService;

    function getNavaidRepo(): INavaidRepo;
}
