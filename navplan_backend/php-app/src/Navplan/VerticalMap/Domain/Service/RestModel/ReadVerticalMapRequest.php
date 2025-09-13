<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service\RestModel;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Rest\Converter\RestLine2dConverter;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\WeatherModelLayer;
use Navplan\MeteoForecast\Rest\Model\RestForecastStepConverter;


class ReadVerticalMapRequest {
    const ARG_POSITIONS = "positions";
    const ARG_LAYER = "layer";


    public function __construct(
        public Line2d $route,
        public ?ForecastStep $forecastStep,
        public ?int $layer
    ) {
    }


    public static function fromArgs(array $args): ReadVerticalMapRequest {
        if (!$args || !$args[self::ARG_POSITIONS] || count($args[self::ARG_POSITIONS]) < 2) {
            throw new InvalidArgumentException("ERROR: parameter '" . self::ARG_POSITIONS . "' missing or less than 2 positions!");
        }

        return new ReadVerticalMapRequest(
            RestLine2dConverter::fromRest($args[self::ARG_POSITIONS]),
            RestForecastStepConverter::fromRest($args),
            $args[self::ARG_LAYER] ? WeatherModelLayer::fromString($args[self::ARG_LAYER]) : null
        );
    }
}
