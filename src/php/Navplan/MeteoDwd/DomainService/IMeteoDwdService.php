<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastTime;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WeatherGrid;
use Navplan\MeteoDwd\DomainModel\WindInfoGrid;


interface IMeteoDwdService {
    function readWindSpeedDirGrid(ForecastTime $forecastTime, GridDefinition $grid): WindInfoGrid;

    function readWeatherGrid(ForecastTime $forecastTime, GridDefinition $grid): WeatherGrid;
}
