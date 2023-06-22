<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\MeteoDwd\DomainService\ReadPosVerticalCloudsRequest;


class RestReadPosVerticalCloudsRequestConverter {
    const ARG_POS_LAT = "lat";
    const ARG_POS_LON = "lon";
    const ARG_FORECAST_RUN = "forecastrun";


    public static function fromRest(array $args): ReadPosVerticalCloudsRequest {
        $forecastRun = RestForecastRunConverter::fromRest($args[self::ARG_FORECAST_RUN]);
        $pos = RestPosition2dConverter::fromRest([$args[self::ARG_POS_LON], $args[self::ARG_POS_LAT]]);

        return new ReadPosVerticalCloudsRequest(
            $forecastRun,
            $pos
        );
    }
}
