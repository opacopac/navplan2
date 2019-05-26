<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use InvalidArgumentException;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\IConfig\ISearchConfig;
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


    public static function processRequest(array $getVars, ISearchConfig $config) {
        $action = isset($getVars[self::ARG_ACTION]) ? $getVars[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                $query = SearchByTextQueryRest::fromArray($getVars, $config);
                $result = SearchByText::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $query = SearchByPositionQueryRest::fromArray($getVars, $config);
                $result = SearchByPosition::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_EXTENT:
                $query = SearchByExtentQueryRest::fromArray($getVars, $config);
                $result = SearchByExtent::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                $query = SearchByIcaoQueryRest::fromArray($getVars, $config);
                $result = SearchByIcao::search($query, $config);
                self::sendSearchResultResponse($result, $config->getHttpResponseService());
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }


    private static function sendSearchResultResponse(SearchResult $result, IHttpResponseService $httpService) {
        $resultArray = SearchResultRest::toArray($result);
        $callback = isset($_GET["callback"]) ? StringNumberService::checkAlphaNumeric($_GET["callback"], 1, 50) : NULL;
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray, $callback, TRUE);
    }
}
