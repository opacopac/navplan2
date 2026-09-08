<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

use Navplan\Common\Rest\Controller\IRestController;


interface IMeteoForecastDiContainer
{
    function getMeteoForecastController(): IRestController;
}




