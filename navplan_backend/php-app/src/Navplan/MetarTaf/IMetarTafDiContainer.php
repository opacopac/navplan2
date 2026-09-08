<?php declare(strict_types=1);

namespace Navplan\MetarTaf;

use Navplan\Common\Rest\Controller\IRestController;


interface IMetarTafDiContainer {
    function getReadMetarTafController(): IRestController;
}
