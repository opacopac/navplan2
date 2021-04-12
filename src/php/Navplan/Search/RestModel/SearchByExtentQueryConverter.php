<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Search\DomainModel\SearchByExtentQuery;
use Navplan\Shared\StringNumberHelper;


class SearchByExtentQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): SearchByExtentQuery {
        $searchItems = SearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT);
        $extent = Extent::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
        $zoom = StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);
        $minNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MAX_NOTAM_TIME);
        $token = StringNumberHelper::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByExtentQuery(
            $searchItems,
            $extent,
            $zoom,
            $minNotamTimestamp,
            $maxNotamTimestamp,
            $token
        );
    }
}
