<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemAirspace;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\MapFeatures\SearchItemWebcam;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByExtent {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_MIN_LON = "minlon";
    const ARG_MIN_LAT = "minlat";
    const ARG_MAX_LON = "maxlon";
    const ARG_MAX_LAT = "maxlat";
    const ARG_ZOOM = "zoom";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";
    const ARG_TOKEN = "token";


    public static function searchByExtent(array $args, IDbService $dbService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args[self::ARG_SEARCH_ITEMS]);
        $minLon = floatval(StringNumberService::checkNumeric($args[self::ARG_MIN_LON]));
        $minLat = floatval(StringNumberService::checkNumeric($args[self::ARG_MIN_LAT]));
        $maxLon = floatval(StringNumberService::checkNumeric($args[self::ARG_MAX_LON]));
        $maxLat = floatval(StringNumberService::checkNumeric($args[self::ARG_MAX_LAT]));
        $zoom = intval(StringNumberService::checkNumeric($args[self::ARG_ZOOM]));
        $minNotamTimestamp = $args[self::ARG_MIN_NOTAM_TIME] ? intval(StringNumberService::checkNumeric($args[self::ARG_MIN_NOTAM_TIME])) : 0;
        $maxNotamTimestamp = $args[self::ARG_MAX_NOTAM_TIME] ? intval(StringNumberService::checkNumeric($args[self::ARG_MAX_NOTAM_TIME])) : 0;
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $args[self::ARG_TOKEN]);

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
                    $airports = SearchItemAirport::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat, $zoom, $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                    $resultNum += count($navaids);
                    break;
                case SearchItem::AIRSPACES:
                    $airspaces = SearchItemAirspace::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat, $zoom);
                    $resultNum += count($airspaces);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat);
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat, $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::WEBCAMS:
                    $webcams = SearchItemWebcam::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat);
                    $resultNum += count($webcams);
                    break;
                case SearchItem::NOTAMS:
                    $notams = SearchItemNotam::searchByExtent($dbService, $minLon, $minLat, $maxLon, $maxLat, $zoom, $minNotamTimestamp, $maxNotamTimestamp);
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

        $dbService->closeDb();
    }


    private static function getMaxExtentResults($resultNum) {
        return max(min(self::MAX_EXTENT_SEARCH_RESULTS - $resultNum, self::MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
