<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\OpenAip\DomainModel\SearchAreaItemsRequest;
use Navplan\Shared\StringNumberHelper;


class SearchAreaItemsRequestConverter {
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";


    public static function fromArgs(array $args): SearchAreaItemsRequest {
        $minLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LON);
        $minLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MIN_LAT);
        $maxLon = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LON);
        $maxLat = StringNumberHelper::parseFloatOrError($args, self::ARG_MAX_LAT);
        $extent = Extent::createFromCoords($minLon, $minLat, $maxLon, $maxLat);
        $zoom = StringNumberHelper::parseIntOrError($args, self::ARG_ZOOM);


        return new SearchAreaItemsRequest(
            $extent,
            $zoom
        );
    }
}
