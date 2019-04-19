<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Shared\IDbService;


class SearchServiceProcessor
{
    public static function processRequest(array $getVars, IDbService $dbService) {
        switch ($getVars["action"]) {
            case "searchByText":
                SearchByText::searchByText($getVars, $dbService);
                break;
            case "searchByPosition":
                SearchByPosition::searchByPosition($getVars, $dbService);
                break;
            case "searchByExtent":
                SearchByExtent::searchByExtent($getVars, $dbService);
                break;
            case "searchByIcao":
                SearchByIcao::searchByIcao($getVars, $dbService);
                break;
            default:
                die("unknown action!");
        }
    }
}
