<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Rest\Converter\RestDateConverter;
use Navplan\MeteoForecast\Domain\Model\ForecastRun;
use Navplan\MeteoForecast\Domain\Model\WeatherModelIconD2;


class RestForecastRunConverter
{
    const ARG_START_TIME = "starttime";
    const ARG_MODEL = "model";


    /**
     * @param ForecastRun[] $forecastRuns
     * @return array
     */
    public static function toRestList(array $forecastRuns): array
    {
        return array_map(
            function ($forecastRun) {
                return self::toRest($forecastRun);
            },
            $forecastRuns
        );
    }


    public static function toRest(ForecastRun $forecastRun): array
    {
        return array(
            self::ARG_START_TIME => RestDateConverter::toRest($forecastRun->startTime),
            self::ARG_MODEL => RestWeatherModelConfigConverter::toRest($forecastRun->modelConfig)
        );
    }


    public static function fromRest(string $args): ForecastRun
    {
        return new ForecastRun(
            RestDateConverter::fromRest($args), // TODO: args
            WeatherModelIconD2::getModelConfig() // TODO
        );
    }
}
