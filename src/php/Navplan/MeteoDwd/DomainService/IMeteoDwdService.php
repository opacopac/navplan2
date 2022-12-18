<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainModel\WindInfo;


interface IMeteoDwdService {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;

    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WeatherInfo[]
     */
    function readWeatherGrid(ForecastStep $forecastTime, GridDefinition $grid): array;

    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WindInfo[]
     */
    function readWindSpeedDirGrid(ForecastStep $forecastTime, GridDefinition $grid): array;

    function getIconD2ModelConfig(): WeatherModelConfig;
}
