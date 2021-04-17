<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Shared\StringNumberHelper;


class ReadNotamRequestConverter {
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_MIN_NOTAM_TIME = "starttimestamp";
    const ARG_MAX_NOTAM_TIME = "endtimestamp";


    public static function fromArgs(array $args): ReadNotamByExtentRequest {
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT);
        $extent = Extent::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
        $zoom = StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);
        $minNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MAX_NOTAM_TIME);

        return new ReadNotamByExtentRequest(
            $extent,
            $zoom,
            $minNotamTimestamp,
            $maxNotamTimestamp
        );
    }
}
