<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\StringNumberService;


class SearchByIcao {
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_ICAO = "icao";
    const ARG_MIN_NOTAM_TIME = "minnotamtime";
    const ARG_MAX_NOTAM_TIME = "maxnotamtime";


    public static function searchByIcao(array $args, IDbService $dbService, IHttpResponseService $httpService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args[self::ARG_SEARCH_ITEMS]);
        $icaoList = SearchHelper::checkEscapeIcaoList($dbService, $args[self::ARG_ICAO]);
        $minNotamTimestamp = isset($args[self::ARG_MIN_NOTAM_TIME]) ? intval(StringNumberService::checkNumeric($args[self::ARG_MIN_NOTAM_TIME])) : 0;
        $maxNotamTimestamp = isset($args[self::ARG_MAX_NOTAM_TIME]) ? intval(StringNumberService::checkNumeric($args[self::ARG_MAX_NOTAM_TIME])) : 0;

        $airports = [];
        $reportingPoints = [];
        $webcams = [];
        $notams = [];

        foreach ($searchItems as $searchItem) {
            switch ($searchItem) {
                case SearchItem::AIRPORTS:
                    $airports = SearchItemAirport::searchByIcao($dbService, $icaoList);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByIcao($dbService, $icaoList);
                    break;
                /*case SearchItem::WEBCAMS:
                    $webcams = SearchItemWebcam::searchByIcao($dbService, $icaoList);
                    break;*/
                case SearchItem::NOTAMS:
                    $notams = SearchItemNotam::searchByIcao($dbService, $icaoList, $minNotamTimestamp, $maxNotamTimestamp);
                    break;
            }
        }

        SearchHelper::sendSearchResultResponse(
            array(
                SearchItem::AIRPORTS => $airports,
                SearchItem::NAVAIDS => [],
                SearchItem::AIRSPACES => [],
                SearchItem::REPORTINGPOINTS => $reportingPoints,
                SearchItem::USERPOINTS => [],
                SearchItem::WEBCAMS => $webcams,
                SearchItem::GEONAMES => [],
                SearchItem::NOTAMS => $notams
            ),
            $httpService
        );
        
        $dbService->closeDb();
    }
}
