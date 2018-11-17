<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Shared\StringNumberService;


class SearchHelper
{
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    // TODO: escape
    public static function checkEscapeSearchItems(mysqli $conn, string $searchItemString): array
    {
        if (!$searchItemString)
            die("search items not specified");

        $searchItems = explode(',', $searchItemString);
        foreach ($searchItems as $item) {
            StringNumberService::checkEscapeAlphaNumeric($conn, $item, 1, 20);
        }

        return $searchItems;
    }


    // TODO: escape
    public static function checkEscapeIcaoList(mysqli $conn, string $icaoString): array
    {
        if (!$icaoString)
            die("icao list not specified");

        $icaoList = explode(",", $icaoString);
        foreach ($icaoList as $icao) {
            StringNumberService::checkEscapeAlphaNumeric($conn, $icao, 4, 4);
        }

        return $icaoList;
    }


    public static function sendSearchResultResponse(array $searchResults) {
        header("Content-Type: application/json; charset=UTF-8");
        echo StringNumberService::checkAlphaNumeric($_GET["callback"], 1, 50) . "(";
        echo json_encode($searchResults, JSON_NUMERIC_CHECK);
        echo ")";
    }
}
