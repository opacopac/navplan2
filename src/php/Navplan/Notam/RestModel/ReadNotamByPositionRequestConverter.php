<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\DomainModel\ReadNotamByPositionRequest;


class ReadNotamByPositionRequestConverter {
    const ARG_LON = "longitude";
    const ARG_LAT = "latitude";
    const ARG_MIN_NOTAM_TIME = "starttimestamp";
    const ARG_MAX_NOTAM_TIME = "endtimestamp";


    public static function fromArgs(array $args): ReadNotamByPositionRequest {
        $position = new Position2d(
            StringNumberHelper::parseFloatOrError($args, self::ARG_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_LAT)
        );
        $minNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MAX_NOTAM_TIME);

        return new ReadNotamByPositionRequest(
            $position,
            $minNotamTimestamp,
            $maxNotamTimestamp
        );
    }
}
