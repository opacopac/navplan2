<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;


class SearchByIcao {
    public static function searchByIcao(array $args, IDbService $dbService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args["searchItems"]);
        $icaoList = SearchHelper::checkEscapeIcaoList($dbService, $args["icao"]);
        $minNotamTimestamp = $args["minnotamtime"] ? StringNumberService::checkNumeric($args["minnotamtime"]) : 0;
        $maxNotamTimestamp = $args["maxnotamtime"] ? StringNumberService::checkNumeric($args["maxnotamtime"]) : 0;

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

        SearchHelper::sendSearchResultResponse(array(
            SearchItem::AIRPORTS => $airports,
            SearchItem::NAVAIDS => [],
            SearchItem::AIRSPACES => [],
            SearchItem::REPORTINGPOINTS => $reportingPoints,
            SearchItem::USERPOINTS => [],
            SearchItem::WEBCAMS => $webcams,
            SearchItem::GEONAMES => [],
            SearchItem::NOTAMS => $notams
        ));
        
        $dbService->closeDb();
    }
}
