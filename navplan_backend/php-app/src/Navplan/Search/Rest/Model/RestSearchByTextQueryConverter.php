<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\Search\Domain\Model\SearchByTextQuery;


class RestSearchByTextQueryConverter
{
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_SEARCH_TEXT = "searchText";


    public static function fromArgs(array $args): SearchByTextQuery
    {
        $searchItems = RestSearchItemTypeConverter::fromString(StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $searchText = StringNumberHelper::parseStringOrError($args, self::ARG_SEARCH_TEXT);
        StringNumberHelper::checkString($searchText, 1, 100);

        return new SearchByTextQuery(
            $searchItems,
            $searchText
        );
    }
}
