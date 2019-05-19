<?php declare(strict_types=1);

namespace Navplan\Search;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;


class SearchServiceProcessor
{
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";

    public static function processRequest(array $getVars, IDbService $dbService, IHttpResponseService $httpService) {
        $action = isset($getVars[self::ARG_ACTION]) ? $getVars[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_TEXT:
                SearchByText::searchByText($getVars, $dbService, $httpService);
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                SearchByPosition::searchByPosition($getVars, $dbService, $httpService);
                break;
            case self::ACTION_SEARCH_BY_EXTENT:
                SearchByExtent::searchByExtent($getVars, $dbService, $httpService);
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                SearchByIcao::searchByIcao($getVars, $dbService, $httpService);
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
