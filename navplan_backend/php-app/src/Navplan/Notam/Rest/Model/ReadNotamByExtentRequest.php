<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Service\NotamExtentRequest;


class ReadNotamByExtentRequest {
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";


    public static function fromRest(array $args): NotamExtentRequest {
        $extent = Extent2d::createFromCoords(
            StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON),
            StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT)
        );
        $zoom = StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);

        return new NotamExtentRequest(
            $extent,
            $zoom,
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
