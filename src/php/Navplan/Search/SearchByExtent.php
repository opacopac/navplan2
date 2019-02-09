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


    public static function searchByExtent(array $args, IDbService $dbService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args["searchItems"]);
        $minLon = floatval(StringNumberService::checkNumeric($args["minlon"]));
        $minLat = floatval(StringNumberService::checkNumeric($args["minlat"]));
        $maxLon = floatval(StringNumberService::checkNumeric($args["maxlon"]));
        $maxLat = floatval(StringNumberService::checkNumeric($args["maxlat"]));
        $zoom = intval(StringNumberService::checkNumeric($args["zoom"]));
        $minNotamTimestamp = $args["minnotamtime"] ? intval(StringNumberService::checkNumeric($args["minnotamtime"])) : 0;
        $maxNotamTimestamp = $args["maxnotamtime"] ? intval(StringNumberService::checkNumeric($args["maxnotamtime"])) : 0;
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $args["token"]);

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
