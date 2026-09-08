<?php declare(strict_types=1);

namespace Navplan\Navaid;

use Navplan\Common\Rest\Controller\IRestController;


interface INavaidDiContainer
{
    function getNavaidController(): IRestController;
}
