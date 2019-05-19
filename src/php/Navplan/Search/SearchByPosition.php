<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Geoname\SearchItemGeoname;
use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByPosition {
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_LON = "lon";
    const ARG_LAT = "lat";
    const ARG_RADIUS = "rad";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";
    const ARG_TOKEN = "token";


    public static function searchByPosition(array $args, IDbService $dbService, IHttpResponseService $httpService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args[self::ARG_SEARCH_ITEMS]);
        $lon = floatval(StringNumberService::checkNumeric($args[self::ARG_LON]));
        $lat = floatval(StringNumberService::checkNumeric($args[self::ARG_LAT]));
        $maxRadius_deg = floatval(StringNumberService::checkNumeric($args[self::ARG_RADIUS]));
        $minNotamTimestamp = isset($args[self::ARG_MIN_NOTAM_TIME]) ? intval(StringNumberService::checkNumeric($args[self::ARG_MIN_NOTAM_TIME])) : 0;
        $maxNotamTimestamp = isset($args[self::ARG_MAX_NOTAM_TIME]) ? intval(StringNumberService::checkNumeric($args[self::ARG_MAX_NOTAM_TIME])) : 0;
        $email = isset($args[self::ARG_TOKEN]) ? UserHelper::escapeAuthenticatedEmailOrNull($dbService, $args[self::ARG_TOKEN]) : NULL;

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
                    $airports = SearchItemAirport::searchByPosition($dbService, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum), $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByPosition($dbService, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByPosition($dbService, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByPosition($dbService, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum), $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::GEONAMES:
                    $geonames = SearchItemGeoname::searchByPosition($dbService, $lon, $lat, $maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
                case SearchItem::NOTAMS:
                    $geonames = SearchItemNotam::searchByPosition($dbService, $lon, $lat, $minNotamTimestamp, $maxNotamTimestamp, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
            }
        }


        SearchHelper::sendSearchResultResponse(
            array(
                SearchItem::AIRPORTS => $airports,
                SearchItem::NAVAIDS => $navaids,
                SearchItem::AIRSPACES => [],
                SearchItem::REPORTINGPOINTS => $reportingPoints,
                SearchItem::USERPOINTS => $userPoints,
                SearchItem::WEBCAMS => [],
                SearchItem::GEONAMES => $geonames,
                SearchItem::NOTAMS => $notams
            ),
            $httpService
        );

        $dbService->closeDb();
    }


    private static function getMaxPositionResults($resultNum)
    {
        return max(min( self::MAX_POSITION_SEARCH_RESULTS - $resultNum, self::MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
