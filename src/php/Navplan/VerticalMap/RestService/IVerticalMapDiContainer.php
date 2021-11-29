<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;


interface IVerticalMapDiContainer {
    function getHttpService(): IHttpService;

    function getVerticalMapService(): IVerticalMapService;
}
