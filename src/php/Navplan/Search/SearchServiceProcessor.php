<?php declare(strict_types=1);

namespace Navplan\Search;

use InvalidArgumentException;
use Navplan\Shared\IDbService;


class SearchServiceProcessor
{
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_TEXT = "searchByText";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";

    public static function processRequest(array $getVars, IDbService $dbService) {
        switch ($getVars[self::ARG_ACTION]) {
            case self::ACTION_SEARCH_BY_TEXT:
                SearchByText::searchByText($getVars, $dbService);
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                SearchByPosition::searchByPosition($getVars, $dbService);
                break;
            case self::ACTION_SEARCH_BY_EXTENT:
                SearchByExtent::searchByExtent($getVars, $dbService);
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                SearchByIcao::searchByIcao($getVars, $dbService);
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
