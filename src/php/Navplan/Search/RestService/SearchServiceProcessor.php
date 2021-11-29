<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use InvalidArgumentException;
use Navplan\Search\RestModel\SearchByPositionQueryConverter;
use Navplan\Search\RestModel\SearchByTextQueryConverter;
use Navplan\Search\RestModel\SearchResultConverter;


class SearchServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";


    public static function processRequest(ISearchServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $searchService = $diContainer->getSearchService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $query = SearchByTextQueryConverter::fromArgs($args);
                $result = $searchService->searchByText($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $query = SearchByPositionQueryConverter::fromArgs($args);
                $result = $searchService->searchByPosition($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
