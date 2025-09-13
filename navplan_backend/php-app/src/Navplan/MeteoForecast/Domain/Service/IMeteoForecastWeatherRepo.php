<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\GridDefinition;
use Navplan\MeteoForecast\Domain\Model\WeatherInfo;


interface IMeteoForecastWeatherRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param GridDefinition $grid
     * @return WeatherInfo[]
     */
    function readWeatherInfo(ForecastStep $forecastStep, GridDefinition $grid): array;
}
