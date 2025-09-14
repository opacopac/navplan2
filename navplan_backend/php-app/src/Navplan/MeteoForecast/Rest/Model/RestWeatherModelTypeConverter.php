<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\WeatherModelType;


class RestWeatherModelTypeConverter
{
    const ARG_MODEL_TYPE = "model";


    public static function fromRest(array $args): int
    {
        return WeatherModelType::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_MODEL_TYPE));
    }
}
