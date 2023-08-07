<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Precipitation;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;


interface IMeteoDwdPrecipRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return Precipitation[]
     */
    function readPrecip(ForecastStep $forecastStep, array $posList): array;
}
