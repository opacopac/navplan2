<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Common\Rest\Controller\IRestController;


interface IVerticalMapDiContainer {
    function getVerticalMapController(): IRestController;
}
