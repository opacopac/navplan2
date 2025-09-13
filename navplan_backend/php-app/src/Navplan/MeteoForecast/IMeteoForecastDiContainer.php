<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWeatherRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWindRepo;


interface IMeteoForecastDiContainer
{
    function getMeteoForecastController(): IRestController;

    function getMeteoForecastRepo(): IMeteoForecastRepo;

    function getMeteoForecastWeatherRepo(): IMeteoForecastWeatherRepo;

    function getMeteoForecastWindRepo(): IMeteoForecastWindRepo;

    function getMeteoForecastPrecipRepo(): IMeteoForecastPrecipRepo;

    function getMeteoForecastTempRepo(): IMeteoForecastTempRepo;

    function getMeteoForecastVerticalCloudRepo(): IMeteoForecastVerticalCloudRepo;

    function getMeteoForecastVerticalWindRepo(): IMeteoForecastVerticalWindRepo;
}
