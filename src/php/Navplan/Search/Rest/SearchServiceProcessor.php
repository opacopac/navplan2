<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use InvalidArgumentException;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\Search\UseCase\SearchByExtent;
use Navplan\Search\UseCase\SearchByIcao;
use Navplan\Search\UseCase\SearchByPosition;
use Navplan\Search\UseCase\SearchByText;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Shared\StringNumberService;


class SearchServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";


    public static function processRequest(array $getArgs, ISearchConfig $config) {
        $action = isset($getArgs[self::ARG_ACTION]) ? $getArgs[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $query = RestSearchByTextQuery::fromArray($getArgs);
                $result = SearchByText::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $query = RestSearchByPositionQuery::fromArray($getArgs);
                $result = SearchByPosition::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_EXTENT:
                $query = RestSearchByExtentQuery::fromArray($getArgs);
                $result = SearchByExtent::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                $query = RestSearchByIcaoQuery::fromArray($getArgs);
                $result = SearchByIcao::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }


    private static function sendSearchResultResponse(SearchResult $result, IHttpResponseService $httpService) {
        $resultArray = RestSearchResult::toArray($result);
        $callback = isset($_GET["callback"]) ? StringNumberService::checkAlphaNumeric($_GET["callback"], 1, 50) : NULL;
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray, $callback, TRUE);
    }
}
