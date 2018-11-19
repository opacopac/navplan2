<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Geoname\SearchItemGeoname;
use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\Shared\DbService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByPosition
{
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public static function searchByPosition()
    {
        $conn = DbService::openDb();
        $searchItems = SearchHelper::checkEscapeSearchItems($conn, $_GET["searchItems"]);
        $lon = StringNumberService::checkNumeric($_GET["lon"]);
        $lat = StringNumberService::checkNumeric($_GET["lat"]);
        $maxRadius_deg = StringNumberService::checkNumeric($_GET["rad"]);
        $minNotamTimestamp = $_GET["minnotamtime"] ? StringNumberService::checkNumeric($_GET["minnotamtime"]) : 0;
        $maxNotamTimestamp = $_GET["maxnotamtime"] ? StringNumberService::checkNumeric($_GET["maxnotamtime"]) : 0;
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $_GET["token"]);

        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];
        $notams = [];

        foreach ($searchItems as $searchItem) {
            if ($resultNum >= self::MAX_POSITION_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItem::AIRPORTS:
                    $airports = SearchItemAirport::searchByPosition($conn, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum), $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByPosition($conn, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByPosition($conn, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByPosition($conn, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum), $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::GEONAMES:
                    $geonames = SearchItemGeoname::searchByPosition($conn, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
                case SearchItem::NOTAMS:
                    $geonames = SearchItemNotam::searchByPosition($conn, $lon, $lat, $minNotamTimestamp, $maxNotamTimestamp, self::getMaxPositionResults($resultNum));
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
            SearchItem::NOTAMS => $notams
        ));
    }


    private static function getMaxPositionResults($resultNum)
    {
        return max(min( self::MAX_POSITION_SEARCH_RESULTS - $resultNum, self::MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
