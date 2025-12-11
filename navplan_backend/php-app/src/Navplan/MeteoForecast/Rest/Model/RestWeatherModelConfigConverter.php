<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Rest\Converter\RestTimeConverter;
use Navplan\Common\Rest\Converter\RestRing2dConverter;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoForecast\Domain\Model\WeatherModelConfig;
use Navplan\MeteoForecast\Domain\Model\WeatherModelType;


class RestWeatherModelConfigConverter {
    private const string ARG_MODEL_TYPE = "model";
    private const string ARG_MIN_STEP = "minstep";
    private const string ARG_MAX_STEP = "maxstep";
    private const string ARG_STEP_LENGRH = "steplen";
    private const string ARG_GRID_RESOLUTION = "gridresolution";
    private const string ARG_SPATIAL_COVERAGE = "spatialcoverage";
    private const string ARG_MAX_ZOOM_LEVEL = "maxzoom";


    public static function toRest(WeatherModelConfig $modelConfig): ?array {
        return [
            self::ARG_MODEL_TYPE => WeatherModelType::toString($modelConfig->modelType),
            self::ARG_MIN_STEP => $modelConfig->minStep,
            self::ARG_MAX_STEP => $modelConfig->maxStep,
            self::ARG_STEP_LENGRH => RestTimeConverter::toRest($modelConfig->stepLength),
            self::ARG_GRID_RESOLUTION => RestLengthConverter::toRest($modelConfig->gridResolution),
            self::ARG_SPATIAL_COVERAGE => RestRing2dConverter::toRest($modelConfig->spatialCoverage),
            self::ARG_MAX_ZOOM_LEVEL => $modelConfig->maxZoomLevel
        ];
    }
}
