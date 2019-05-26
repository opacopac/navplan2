<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchByPositionQuery;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByPositionQueryRest {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_LON = "lon";
    const ARG_LAT = "lat";
    const ARG_RADIUS = "rad";
    const ARG_TOKEN = "token";


    public static function fromArray(
        array $args,
        ISearchConfig $config // TODO: remove
    ): SearchByPositionQuery {
        $searchItems = SearchItemTypeRest::fromString(StringNumberService::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $lon = StringNumberService::parseFloatOrError($args, self::ARG_LON);
        $lat = StringNumberService::parseFloatOrError($args, self::ARG_LAT);
        $position = new Position2d($lon, $lat);
        $maxRadius_deg = StringNumberService::parseFloatOrError($args, self::ARG_RADIUS);
        $email = isset($args[self::ARG_TOKEN]) ? UserHelper::escapeAuthenticatedEmailOrNull($config->getDbService(), $args[self::ARG_TOKEN]) : NULL;

        return new SearchByPositionQuery(
            $searchItems,
            $position,
            $maxRadius_deg,
            $email
        );
    }
}
