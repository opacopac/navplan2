<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;


interface IMeteoSmaDiContainer
{
    function getMeteoSmaController(): IRestController;

    function getMeteoSmaService(): IMeteoSmaService;
}
