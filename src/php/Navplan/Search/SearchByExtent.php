<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemAirspace;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\MapFeatures\SearchItemWebcam;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByExtent
{
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;


    public static function searchByExtent(mysqli $conn, array $args)
    {
        $searchItems = SearchHelper::checkEscapeSearchItems($conn, $args["searchItems"]);
        $minLon = StringNumberService::checkNumeric($args["minlon"]);
        $minLat = StringNumberService::checkNumeric($args["minlat"]);
        $maxLon = StringNumberService::checkNumeric($args["maxlon"]);
        $maxLat = StringNumberService::checkNumeric($args["maxlat"]);
        $zoom = StringNumberService::checkNumeric($args["zoom"]);
        $minNotamTimestamp = $args["minnotamtime"] ? StringNumberService::checkNumeric($args["minnotamtime"]) : 0;
        $maxNotamTimestamp = $args["maxnotamtime"] ? StringNumberService::checkNumeric($args["maxnotamtime"]) : 0;
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $args["token"]);

        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $airspaces = [];
        $reportingPoints = [];
        $userPoints = [];
        $webcams = [];
        $notams = [];

        foreach ($searchItems as $searchItem) {
            if ($resultNum >= self::MAX_EXTENT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItem::AIRPORTS:
                    $airports = SearchItemAirport::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom, $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                    $resultNum += count($navaids);
                    break;
                case SearchItem::AIRSPACES:
                    $airspaces = SearchItemAirspace::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                    $resultNum += count($airspaces);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::WEBCAMS:
                    $webcams = SearchItemWebcam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat);
                    $resultNum += count($webcams);
                    break;
                case SearchItem::NOTAMS:
                    $notams = SearchItemNotam::searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $zoom, $minNotamTimestamp, $maxNotamTimestamp);
                    $resultNum += count($notams);
                    break;
            }
        }

        // return output
        SearchHelper::sendSearchResultResponse(array(
            SearchItem::AIRPORTS => $airports,
            SearchItem::NAVAIDS => $navaids,
            SearchItem::AIRSPACES => $airspaces,
            SearchItem::REPORTINGPOINTS => $reportingPoints,
            SearchItem::USERPOINTS => $userPoints,
            SearchItem::WEBCAMS => $webcams,
            SearchItem::GEONAMES => [],
            SearchItem::NOTAMS => $notams
        ));
    }


    private static function getMaxExtentResults($resultNum) {
        return max(min(self::MAX_EXTENT_SEARCH_RESULTS - $resultNum, self::MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
