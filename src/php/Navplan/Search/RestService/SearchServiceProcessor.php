<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use InvalidArgumentException;
use Navplan\Search\RestModel\SearchByExtentQueryConverter;
use Navplan\Search\RestModel\SearchByIcaoQueryConverter;
use Navplan\Search\RestModel\SearchByPositionQueryConverter;
use Navplan\Search\RestModel\SearchByTextQueryConverter;
use Navplan\Search\RestModel\SearchResultConverter;


class SearchServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";


    public static function processRequest(array $args, ISearchServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $query = SearchByTextQueryConverter::fromArgs($args);
                $result = $diContainer->getSearchByTextUc()->search($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $query = SearchByPositionQueryConverter::fromArgs($args);
                $result = $diContainer->getSearchByPositionUc()->search($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_EXTENT:
                $query = SearchByExtentQueryConverter::fromArgs($args);
                $result = $diContainer->getSearchByExtentUc()->search($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                $query = SearchByIcaoQueryConverter::fromArgs($args);
                $result = $diContainer->getSearchByIcaoUc()->search($query);
                $httpService->sendArrayResponse(SearchResultConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
