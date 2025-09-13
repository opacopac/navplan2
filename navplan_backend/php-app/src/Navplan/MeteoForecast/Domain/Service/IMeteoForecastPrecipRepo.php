<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Precipitation;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;


interface IMeteoForecastPrecipRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return Precipitation[]
     */
    function readPrecip(ForecastStep $forecastStep, array $posList): array;
}
