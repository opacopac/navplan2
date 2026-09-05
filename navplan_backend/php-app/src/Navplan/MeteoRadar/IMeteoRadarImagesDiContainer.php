<?php declare(strict_types=1);

namespace Navplan\MeteoRadar;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;


interface IMeteoRadarImagesDiContainer
{
    function getMeteoRadarImagesController(): IRestController;

    function getMeteoRadarImagesRepo(): IMeteoRadarImagesRepo;
}
