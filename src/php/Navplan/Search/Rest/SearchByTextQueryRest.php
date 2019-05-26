<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Shared\StringNumberService;


class SearchByTextQueryRest {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_SEARCH_TEXT = "searchText";
    const ARG_TOKEN = "token";


    public static function fromArray(array $args): SearchByTextQuery {
        $searchItems = SearchItemTypeRest::fromString(StringNumberService::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $searchText = StringNumberService::parseStringOrError($args, self::ARG_SEARCH_TEXT);
        StringNumberService::checkString($searchText, 1, 100);
        $token = StringNumberService::parseStringOrNull($args, self::ARG_TOKEN);

        return new SearchByTextQuery(
            $searchItems,
            $searchText,
            $token
        );
    }
}
