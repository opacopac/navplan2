<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Search\Domain\Model\SearchByExtentQuery;


class RestSearchByExtentQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_TOKEN = "token";


    public static function fromRest(array $args): SearchByExtentQuery {
        $searchItems = RestSearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT);
        $extent = Extent2d::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
        $zoom = StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);
        $notamInterval = RestTimestampIntervalConverter::fromRestOrNull($args);
        $token = StringNumberHelper::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByExtentQuery(
            $searchItems,
            $extent,
            $zoom,
            $notamInterval,
            $token
        );
    }
}
