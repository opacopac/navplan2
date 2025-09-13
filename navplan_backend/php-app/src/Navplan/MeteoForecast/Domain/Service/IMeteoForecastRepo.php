<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\MeteoForecast\Domain\Model\ForecastRun;


interface IMeteoForecastRepo {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;
}
