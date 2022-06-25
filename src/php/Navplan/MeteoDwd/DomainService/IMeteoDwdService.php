<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WeatherGrid;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainModel\WindInfoGrid;


interface IMeteoDwdService {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;

    function readWindSpeedDirGrid(ForecastStep $forecastTime, GridDefinition $grid): WindInfoGrid;

    function readWeatherGrid(ForecastStep $forecastTime, GridDefinition $grid): WeatherGrid;

    function getIconD2ModelConfig(): WeatherModelConfig;
}
