<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use InvalidArgumentException;
use Navplan\Search\Domain\SearchByIcaoQuery;
use Navplan\Shared\StringNumberService;


class RestSearchByIcaoQuery {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_ICAO = "icao";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";


    public static function fromArgs(array $args): SearchByIcaoQuery {
        $searchItems = RestSearchItemType::fromString(StringNumberService::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $icaoList = self::checkEscapeIcaoList($args[self::ARG_ICAO]);
        $minNotamTimestamp = StringNumberService::parseIntOrZero($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberService::parseIntOrZero($args, self::ARG_MAX_NOTAM_TIME);

        return new SearchByIcaoQuery(
            $searchItems,
            $icaoList,
            $minNotamTimestamp,
            $maxNotamTimestamp
        );
    }


    private static function checkEscapeIcaoList(?string $icaoString): array {
        if (!$icaoString) {
            throw new InvalidArgumentException("icao list not specified");
        }

        $icaoList = explode(",", $icaoString);
        foreach ($icaoList as $icao) {
            StringNumberService::checkAlphaNumeric($icao, 4, 4);
        }

        return $icaoList;
    }
}
