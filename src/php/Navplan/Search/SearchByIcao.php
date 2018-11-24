<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemWebcam;
use Navplan\Shared\DbConnection;
use Navplan\Shared\StringNumberService;


class SearchByIcao
{
    public static function searchByIcao(DbConnection $conn, array $args)
    {
        $searchItems = SearchHelper::checkEscapeSearchItems($conn, $args["searchItems"]);
        $icaoList = SearchHelper::checkEscapeIcaoList($conn, $args["icao"]);
        $minNotamTimestamp = $args["minnotamtime"] ? StringNumberService::checkNumeric($args["minnotamtime"]) : 0;
        $maxNotamTimestamp = $args["maxnotamtime"] ? StringNumberService::checkNumeric($args["maxnotamtime"]) : 0;

        $airports = [];
        $reportingPoints = [];
        $webcams = [];
        $notams = [];

        foreach ($searchItems as $searchItem) {
            switch ($searchItem) {
                case SearchItem::AIRPORTS:
                    $airports = SearchItemAirport::searchByIcao($conn, $icaoList);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByIcao($conn, $icaoList);
                    break;
                case SearchItem::WEBCAMS:
                    $webcams = SearchItemWebcam::searchByIcao($conn, $icaoList);
                    break;
                case SearchItem::NOTAMS:
                    $notams = SearchItemNotam::searchByIcao($conn, $icaoList, $minNotamTimestamp, $maxNotamTimestamp);
                    break;
            }
        }


        // return output
        return array(
            SearchItem::AIRPORTS => $airports,
            SearchItem::NAVAIDS => [],
            SearchItem::AIRSPACES => [],
            SearchItem::REPORTINGPOINTS => $reportingPoints,
            SearchItem::USERPOINTS => [],
            SearchItem::WEBCAMS => $webcams,
            SearchItem::GEONAMES => [],
            SearchItem::NOTAMS => $notams
        );
    }
}
