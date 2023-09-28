<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\ForecastRun;


interface IMeteoDwdForecastRepo {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;
}
