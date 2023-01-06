<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\ForecastRun;


interface IMeteoDwdForecastService {
    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array;
}
