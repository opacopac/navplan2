<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Geoname\SearchItemGeoname;
use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByText
{
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    public static function searchByText(mysqli $conn, array $args)
    {
        $searchItems = SearchHelper::checkEscapeSearchItems($conn, $args["searchItems"]);
        $searchText = StringNumberService::checkEscapeString($conn, $args["searchText"], 1, 100);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $args["token"]);

        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];

        foreach ($searchItems as $searchItem) {
            if ($resultNum >= self::MAX_TEXT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItem::AIRPORTS:
                    $airports = SearchItemAirport::searchByText($conn, $searchText, self::getMaxTextResults($resultNum), $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByText($conn, $searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByText($conn, $searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByText($conn, $searchText, self::getMaxTextResults($resultNum), $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::GEONAMES:
                    $geonames = SearchItemGeoname::searchByText($conn, $searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($geonames);
                    break;
            }
        }


        SearchHelper::sendSearchResultResponse(array(
            SearchItem::AIRPORTS => $airports,
            SearchItem::NAVAIDS => $navaids,
            SearchItem::AIRSPACES => [],
            SearchItem::REPORTINGPOINTS => $reportingPoints,
            SearchItem::USERPOINTS => $userPoints,
            SearchItem::WEBCAMS => [],
            SearchItem::GEONAMES => $geonames,
            SearchItem::NOTAMS => []
        ));
    }


    private static function getMaxTextResults(int $resultNum): int {
        return max(min(self::MAX_TEXT_SEARCH_RESULTS - $resultNum, self::MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
