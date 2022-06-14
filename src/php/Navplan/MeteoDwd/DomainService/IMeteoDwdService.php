<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastTime;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WindSpeedDirGrid;
use Navplan\MeteoDwd\DomainModel\WwGrid;


interface IMeteoDwdService {
    function readWindSpeedDirGrid(ForecastTime $forecastTime, GridDefinition $grid): WindSpeedDirGrid;

    function readWwGrid(ForecastTime $forecastTime, GridDefinition $grid): WwGrid;
}
