<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;


interface IMeteoForecastDiContainer
{
    function getMeteoForecastController(): IRestController;

    function getMeteoForecastVerticalCloudRepo(): IMeteoForecastVerticalCloudRepo;

    function getMeteoForecastVerticalWindRepo(): IMeteoForecastVerticalWindRepo;
}




