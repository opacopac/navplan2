<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Model;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;
use Navplan\Search\Domain\Model\SearchByIcaoQuery;


class RestSearchByIcaoQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_ICAO = "icao";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";


    public static function fromArgs(array $args): SearchByIcaoQuery {
        $searchItems = RestSearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $icaoList = self::checkEscapeIcaoList($args[self::ARG_ICAO]);
        $minNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrZero($args, self::ARG_MAX_NOTAM_TIME);

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
            StringNumberHelper::checkAlphaNumeric($icao, 4, 4);
        }

        return $icaoList;
    }
}
