<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Rest\Converter\RestLine2dConverter;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;


class RestReadVerticalCloudsRequest {
    const ARG_POSITIONS = "positions";


    public function __construct(
        public ForecastStep $forecastStep,
        public Line2d $waypoints
    ) {
    }


    public static function fromRest(array $args): RestReadVerticalCloudsRequest
    {
        if (!$args || !$args[self::ARG_POSITIONS] || count($args[self::ARG_POSITIONS]) < 2) {
            throw new InvalidArgumentException("ERROR: parameter '" . self::ARG_POSITIONS . "' missing or less than 2 positions!");
        }

        $forecastTime = RestForecastStepConverter::fromRest($args);
        $waypoints = RestLine2dConverter::fromRest($args[self::ARG_POSITIONS]);

        return new RestReadVerticalCloudsRequest(
            $forecastTime,
            $waypoints
        );
    }
}
