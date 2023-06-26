<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\VerticalWindColumn;


interface IMeteoDwdVerticalWindService {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalWindColumn[]
     */
    function readVerticalWindInfo(ForecastStep $forecastStep, array $posList): array;
}
