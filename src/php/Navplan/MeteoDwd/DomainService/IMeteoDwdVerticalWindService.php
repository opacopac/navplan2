<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\VerticalWindColumn;


interface IMeteoDwdVerticalWindService {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalWindColumn[]
     */
    function readVerticalWindInfo(ForecastStep $forecastStep, array $posList): array;
}
