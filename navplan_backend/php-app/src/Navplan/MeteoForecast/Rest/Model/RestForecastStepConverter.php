<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Service\WeatherModelConfigService;


class RestForecastStepConverter
{
    const ARG_RUN = "run";
    const ARG_INTERVAL = "step";

    public static function fromRest(array $args): ?ForecastStep
    {
        if (!isset($args[self::ARG_RUN]) || !isset($args[self::ARG_INTERVAL])) {
            return null;
        }

        $modelType = RestWeatherModelTypeConverter::fromRest($args);

        return new ForecastStep(
            WeatherModelConfigService::createFromModelType($modelType),
            StringNumberHelper::parseStringOrError($args, self::ARG_RUN),
            StringNumberHelper::parseIntOrError($args, self::ARG_INTERVAL)
        );
    }


    public static function toRest(ForecastStep $forecastStep): array
    {
        return [
            self::ARG_RUN => $forecastStep->runName,
            self::ARG_INTERVAL => $forecastStep->step
        ];
    }
}
