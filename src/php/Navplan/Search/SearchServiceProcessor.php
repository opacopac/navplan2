<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;


class SearchServiceProcessor
{
    public static function processRequest(array $getVars, mysqli $conn)
    {
        switch ($getVars["action"]) {
            case "searchByText":
                SearchByText::searchByText($conn, $getVars);
                break;
            case "searchByPosition":
                SearchByPosition::searchByPosition($conn, $getVars);
                break;
            case "searchByExtent":
                SearchByExtent::searchByExtent($conn, $getVars);
                break;
            case "searchByIcao":
                SearchByIcao::searchByIcao($conn, $getVars);
                break;
            default:
                die("unknown action!");
        }
    }
}
