<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\Domain\Model\ForecastRun;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumn;


interface IMeteoDwdVerticalCloudService {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalCloudColumn[]
     */
    function readVerticalClouds(ForecastStep $forecastStep, array $posList): array;

    /**
     * @param ForecastRun $forecastRun
     * @param Position2d $pos
     * @return VerticalCloudColumn[]
     */
    function readPositionalVerticalClouds(ForecastRun $forecastRun, Position2d $pos): array;
}
