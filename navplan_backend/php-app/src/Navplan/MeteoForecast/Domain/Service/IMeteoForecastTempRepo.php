<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;


interface IMeteoForecastTempRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return float[]
     */
    function readTemp(ForecastStep $forecastStep, array $posList): array;
}
