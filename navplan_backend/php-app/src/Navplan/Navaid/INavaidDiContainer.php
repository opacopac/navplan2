<?php declare(strict_types=1);

namespace Navplan\Navaid;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Navaid\Domain\Service\INavaidService;


interface INavaidDiContainer
{
    function getNavaidController(): IRestController;

    function getNavaidService(): INavaidService;
}
