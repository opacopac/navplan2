<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\VerticalMap\DomainService\IVerticalMapService;


interface IVerticalMapDiContainer {
    function getVerticalMapController(): IRestController;

    function getVerticalMapService(): IVerticalMapService;
}
