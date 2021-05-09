<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Search\DomainModel\SearchByTextQuery;


class SearchByTextQueryConverter {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_SEARCH_TEXT = "searchText";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): SearchByTextQuery {
        $searchItems = SearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $searchText = StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_TEXT);
        StringNumberHelper::checkString($searchText, 1, 100);
        $token = StringNumberHelper::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByTextQuery(
            $searchItems,
            $searchText,
            $token
        );
    }
}
