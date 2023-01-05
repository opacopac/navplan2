<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\WindInfo;


interface IMeteoDwdWindService {
    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WindInfo[]
     */
    function readWindInfo(ForecastStep $forecastTime, GridDefinition $grid): array;
}
