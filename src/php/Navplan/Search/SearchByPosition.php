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


class SearchByPosition
{
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public static function searchByPosition(mysqli $conn, array $args)
    {
        $searchItems = SearchHelper::checkEscapeSearchItems($conn, $args["searchItems"]);
        $lon = StringNumberService::checkNumeric($args["lon"]);
        $lat = StringNumberService::checkNumeric($args["lat"]);
        $maxRadius_deg = StringNumberService::checkNumeric($args["rad"]);
        $minNotamTimestamp = $args["minnotamtime"] ? StringNumberService::checkNumeric($args["minnotamtime"]) : 0;
        $maxNotamTimestamp = $args["maxnotamtime"] ? StringNumberService::checkNumeric($args["maxnotamtime"]) : 0;
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $args["token"]);

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
