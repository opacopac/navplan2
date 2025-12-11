<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Rest\Converter\RestTimeConverter;
use Navplan\Common\Rest\Converter\RestRing2dConverter;
use Navplan\MeteoForecast\Domain\Model\WeatherModelConfig;
use Navplan\MeteoForecast\Domain\Model\WeatherModelType;


class RestWeatherModelConfigConverter {
    const ARG_MODEL_TYPE = "model";
    const ARG_MIN_STEP = "minstep";
    const ARG_MAX_STEP = "maxstep";
    const ARG_STEP_LENGRH = "steplen";
    const ARG_SPATIAL_COVERAGE = "spatialcoverage";
    const ARG_MAX_ZOOM_LEVEL = "maxzoom";


    public static function toRest(WeatherModelConfig $modelConfig): ?array {
        return array(
            self::ARG_MODEL_TYPE => WeatherModelType::toString($modelConfig->modelType),
            self::ARG_MIN_STEP => $modelConfig->minStep,
            self::ARG_MAX_STEP => $modelConfig->maxStep,
            self::ARG_STEP_LENGRH => RestTimeConverter::toRest($modelConfig->stepLength),
            self::ARG_SPATIAL_COVERAGE => RestRing2dConverter::toRest($modelConfig->spatialCoverage),
            self::ARG_MAX_ZOOM_LEVEL => $modelConfig->maxZoomLevel
        );
    }
}
