<?php declare(strict_types=1);

namespace Navplan\Notam\RestService;

use Navplan\Notam\DomainService\INotamService;
use Navplan\System\DomainService\IHttpService;


interface INotamServiceDiContainer {
    function getHttpService(): IHttpService;

    function getNotamService(): INotamService;
}
