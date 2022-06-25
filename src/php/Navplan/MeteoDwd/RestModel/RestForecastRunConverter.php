<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\RestModel\RestDateConverter;
use Navplan\MeteoDwd\DomainModel\ForecastRun;


class RestForecastRunConverter {
    const ARG_START_TIME = "starttime";


    /**
     * @param ForecastRun[] $forecastRuns
     * @return array
     */
    public static function toRestList(array $forecastRuns): array {
        return array_map(
            function ($forecastRun) { return self::toRest($forecastRun); },
            $forecastRuns
        );
    }


    public static function toRest(ForecastRun $forecastRun): array {
        return array(
            self::ARG_START_TIME => RestDateConverter::toRest($forecastRun->startTime)
        );
    }
}
