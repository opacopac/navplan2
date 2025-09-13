<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\GridDefinition;
use Navplan\MeteoForecast\Domain\Model\WindInfo;


interface IMeteoForecastWindRepo {
    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WindInfo[]
     */
    function readWindInfo(ForecastStep $forecastTime, GridDefinition $grid): array;
}
