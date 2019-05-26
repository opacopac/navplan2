<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByTextQueryRest {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_SEARCH_TEXT = "searchText";
    const ARG_TOKEN = "token";


    public static function fromArray(
        array $args,
        ISearchConfig $config // TODO: remove
    ): SearchByTextQuery {
        $searchItems = SearchItemTypeRest::fromString(StringNumberService::parseStringOrError($args, self::ARG_SEARCH_ITEMS));
        $searchText = StringNumberService::parseStringOrError($args, self::ARG_SEARCH_TEXT);
        StringNumberService::checkString($searchText, 1, 100);
        $email = isset($args[self::ARG_TOKEN]) ? UserHelper::escapeAuthenticatedEmailOrNull($config->getDbService(), $args[self::ARG_TOKEN]) : NULL;

        return new SearchByTextQuery(
            $searchItems,
            $searchText,
            $email
        );
    }
}
