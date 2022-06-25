<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\RestModel\RestTimeConverter;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainModel\WeatherModelType;


class RestWeatherModelConfigConverter {
    const ARG_MODEL_TYPE = "model";
    const ARG_MIN_STEP = "minstep";
    const ARG_MAX_STEP = "maxstep";
    const ARG_STEP_LENGRH = "steplen";


    public static function toRest(WeatherModelConfig $modelConfig): ?array {
        return array(
            self::ARG_MODEL_TYPE => WeatherModelType::toString($modelConfig->modelType),
            self::ARG_MIN_STEP => $modelConfig->minStep,
            self::ARG_MAX_STEP => $modelConfig->maxStep,
            self::ARG_STEP_LENGRH => RestTimeConverter::toRest($modelConfig->stepLength)
        );
    }
}
