<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\GridDefinition;
use Navplan\MeteoDwd\Domain\Model\WindInfo;


interface IMeteoDwdWindRepo {
    /**
     * @param ForecastStep $forecastTime
     * @param GridDefinition $grid
     * @return WindInfo[]
     */
    function readWindInfo(ForecastStep $forecastTime, GridDefinition $grid): array;
}
