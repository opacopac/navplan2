<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\VerticalCloudColumn;


interface IMeteoForecastVerticalCloudRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalCloudColumn[]
     */
    function readVerticalClouds(ForecastStep $forecastStep, array $posList): array;
}
