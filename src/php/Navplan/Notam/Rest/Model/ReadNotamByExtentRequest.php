<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\StringNumberHelper;


class ReadNotamByExtentRequest {
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_MIN_NOTAM_TIME = "starttimestamp";
    const ARG_MAX_NOTAM_TIME = "endtimestamp";


    public function __construct(
        public Extent2d $extent,
        public int $zoom,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }


    public static function fromRest(array $args): ReadNotamByExtentRequest {
        $extent = Extent2d::createFromCoords(
            StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT)
        );
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
