<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\StringNumberHelper;
use Navplan\Search\DomainModel\SearchByPositionQuery;


class SearchByPositionQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_LON = "lon";
    const ARG_LAT = "lat";
    const ARG_RADIUS = "rad";
    const ARG_MAX_RESULTS = "maxresults";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): SearchByPositionQuery {
        $searchItems = SearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $lon = StringNumberHelper::parseFloatOrError($args, self::ARG_LON);
        $lat = StringNumberHelper::parseFloatOrError($args, self::ARG_LAT);
        $position = new Position2d($lon, $lat);
        $maxRadius_deg = StringNumberHelper::parseFloatOrError($args, self::ARG_RADIUS);
        $maxResults = StringNumberHelper::parseIntOrError($args, self::ARG_MAX_RESULTS);
        $minNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MAX_NOTAM_TIME);
        $token = StringNumberHelper::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByPositionQuery(
            $searchItems,
            $position,
            $maxRadius_deg,
            $maxResults,
            $minNotamTimestamp,
            $maxNotamTimestamp,
            $token
        );
    }
}
