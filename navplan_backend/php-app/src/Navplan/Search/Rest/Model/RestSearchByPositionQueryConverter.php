<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Search\Domain\Model\SearchByPositionQuery;


class RestSearchByPositionQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_LON = "lon";
    const ARG_LAT = "lat";
    const ARG_RADIUS = "rad";
    const ARG_MAX_RESULTS = "maxresults";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): SearchByPositionQuery {
        $searchItems = RestSearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $lon = StringNumberHelper::parseFloatOrError($args, self::ARG_LON);
        $lat = StringNumberHelper::parseFloatOrError($args, self::ARG_LAT);
        $position = new Position2d($lon, $lat);
        $maxRadius_deg = StringNumberHelper::parseFloatOrError($args, self::ARG_RADIUS);
        $maxResults = StringNumberHelper::parseIntOrError($args, self::ARG_MAX_RESULTS);
        $notamInterval = RestTimestampIntervalConverter::fromRest($args);
        $token = StringNumberHelper::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByPositionQuery(
            $searchItems,
            $position,
            $maxRadius_deg,
            $maxResults,
            $notamInterval,
            $token
        );
    }
}
