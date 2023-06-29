<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Model;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Service\ReadCloudMeteogramRequest;


class RestReadCloudMeteogramRequestConverter {
    const ARG_POS_LAT = "lat";
    const ARG_POS_LON = "lon";
    const ARG_MIN_STEP = "minstep";
    const ARG_MAX_STEP = "maxstep";
    const ARG_FORECAST_RUN = "forecastrun";

    public static function fromRest(array $args): ReadCloudMeteogramRequest {
        return new ReadCloudMeteogramRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_FORECAST_RUN),
            StringNumberHelper::parseIntOrError($args, self::ARG_MIN_STEP),
            StringNumberHelper::parseIntOrError($args, self::ARG_MAX_STEP),
            RestPosition2dConverter::fromRest([
                StringNumberHelper::parseFloatOrError($args, self::ARG_POS_LON),
                StringNumberHelper::parseFloatOrError($args, self::ARG_POS_LAT)
            ])
        );
    }
}
