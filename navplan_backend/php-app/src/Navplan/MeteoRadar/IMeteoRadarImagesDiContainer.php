<?php declare(strict_types=1);

namespace Navplan\MeteoRadar;

use Navplan\Common\Rest\Controller\IRestController;


interface IMeteoRadarImagesDiContainer
{
    function getMeteoRadarImagesController(): IRestController;
}


