<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;


interface IMeteoDwdForecastService {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;

    function getIconD2ModelConfig(): WeatherModelConfig;
}
