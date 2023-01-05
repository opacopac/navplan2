<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;


interface IMeteoDwdWeatherService {
    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WeatherInfo[]
     */
    function readWeatherInfo(ForecastStep $forecastTime, GridDefinition $grid): array;
}
