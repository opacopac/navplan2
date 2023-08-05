<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\GridDefinition;
use Navplan\MeteoDwd\Domain\Model\WeatherInfo;


interface IMeteoDwdWeatherRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param GridDefinition $grid
     * @return WeatherInfo[]
     */
    function readWeatherInfo(ForecastStep $forecastStep, GridDefinition $grid): array;
}
