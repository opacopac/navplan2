<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\VerticalCloudColumn;


interface IMeteoDwdVerticalCloudService {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalCloudColumn[]
     */
    function readVerticalCloudInfo(ForecastStep $forecastStep, array $posList): array;

    /**
     * @param ForecastRun $forecastRun
     * @param Position2d $pos
     * @return VerticalCloudColumn[]
     */
    function readPositionalVerticalCloudInfo(ForecastRun $forecastRun, Position2d $pos): array;
}
