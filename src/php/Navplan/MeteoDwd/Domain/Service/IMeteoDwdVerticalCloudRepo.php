<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumn;


interface IMeteoDwdVerticalCloudRepo {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalCloudColumn[]
     */
    function readVerticalClouds(ForecastStep $forecastStep, array $posList): array;
}
