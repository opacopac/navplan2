<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\UseCase\ReadVerticalMap\IReadVerticalMapUc;


interface IVerticalMapDiContainer {
    function getHttpService(): IHttpService;

    function getReadVerticalMapUc(): IReadVerticalMapUc;

    function getVerticalMapService(): IVerticalMapService;
}
