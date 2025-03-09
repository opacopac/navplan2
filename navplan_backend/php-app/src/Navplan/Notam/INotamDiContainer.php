<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Domain\Service\INotamService;


interface INotamDiContainer
{
    function getNotamConfig(): INotamConfig;

    function getNotamController(): IRestController;

    function getNotamService(): INotamService;
}
