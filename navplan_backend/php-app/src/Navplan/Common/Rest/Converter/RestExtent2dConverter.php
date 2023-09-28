<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\StringNumberHelper;


class RestExtent2dConverter {
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";


    public static function toRest(Extent2d $extent, ?int $roundToDigits = NULL): array {
        return [
            RestPosition2dConverter::toRest($extent->minPos, $roundToDigits),
            RestPosition2dConverter::toRest($extent->maxPos, $roundToDigits)
        ];
    }


    public static function fromArgs(array $args): Extent2d {
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT);

        return Extent2d::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
    }
}
