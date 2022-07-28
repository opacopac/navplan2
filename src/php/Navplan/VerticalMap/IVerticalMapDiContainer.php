<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\VerticalMap\DomainService\IVerticalMapService;


interface IVerticalMapDiContainer {
    function getVerticalMapService(): IVerticalMapService;
}
