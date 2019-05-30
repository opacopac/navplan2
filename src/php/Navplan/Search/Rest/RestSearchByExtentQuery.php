<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Geometry\Domain\Extent;
use Navplan\Search\Domain\SearchByExtentQuery;
use Navplan\Shared\StringNumberService;


class RestSearchByExtentQuery {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";
    const ARG_TOKEN = "token";


    public static function fromArray(array $args): SearchByExtentQuery {
        $searchItems = RestSearchItemType::fromString(StringNumberService::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $minLon = StringNumberService::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberService::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberService::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberService::parseFloatOrError($args, self::ARG_MAX_LAT);
        $extent = Extent::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
        $zoom = StringNumberService::parseIntOrError($args, self::ARG_ZOOM);
        $minNotamTimestamp = StringNumberService::parseIntOrZero($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberService::parseIntOrZero($args, self::ARG_MAX_NOTAM_TIME);
        $token = StringNumberService::parseStringOrNull($args, self::ARG_TOKEN);

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
