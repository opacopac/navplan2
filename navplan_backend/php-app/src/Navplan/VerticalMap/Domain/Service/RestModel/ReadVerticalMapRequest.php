<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service\RestModel;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Rest\Converter\RestLine2dConverter;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\WeatherModelConfig;
use Navplan\MeteoForecast\Domain\Model\WeatherModelLayer;
use Navplan\MeteoForecast\Domain\Service\WeatherModelConfigService;
use Navplan\MeteoForecast\Rest\Model\RestForecastStepConverter;
use Navplan\MeteoForecast\Rest\Model\RestWeatherModelTypeConverter;


class ReadVerticalMapRequest
{
    const ARG_POSITIONS = "positions";
    const ARG_LAYER = "layer";


    public function __construct(
        public Line2d $route,
        public ?WeatherModelConfig $modelConfig,
        public ?ForecastStep $forecastStep,
        public ?int $layer
    )
    {
    }


    public static function fromArgs(array $args): ReadVerticalMapRequest
    {
        if (!$args || !$args[self::ARG_POSITIONS] || count($args[self::ARG_POSITIONS]) < 2) {
            throw new InvalidArgumentException("ERROR: parameter '" . self::ARG_POSITIONS . "' missing or less than 2 positions!");
        }

        $weatherModelType = RestWeatherModelTypeConverter::fromRest($args);

        return new ReadVerticalMapRequest(
            RestLine2dConverter::fromRest($args[self::ARG_POSITIONS]),
            $weatherModelType != null ? WeatherModelConfigService::createFromModelType($weatherModelType) : null,
            RestForecastStepConverter::fromRest($args),
            $args[self::ARG_LAYER] ? WeatherModelLayer::fromString($args[self::ARG_LAYER]) : null
        );
    }
}
