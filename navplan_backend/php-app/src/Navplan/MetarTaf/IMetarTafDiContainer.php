<?php declare(strict_types=1);

namespace Navplan\MetarTaf;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MetarTaf\Domain\Service\IMetarTafService;


interface IMetarTafDiContainer {
    function getReadMetarTafController(): IRestController;

    function getMetarTafService(): IMetarTafService;
}
