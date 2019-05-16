<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Geoname\SearchItemGeoname;
use Navplan\MapFeatures\SearchItemAirport;
use Navplan\MapFeatures\SearchItemNavaid;
use Navplan\MapFeatures\SearchItemReportingPoint;
use Navplan\MapFeatures\SearchItemUserPoint;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;
use Navplan\User\UserHelper;


class SearchByText {
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;
    const ARG_SEARCH_ITEMS = "searchItems";
    const ARG_SEARCH_TEXT = "searchText";
    const ARG_TOKEN = "token";


    /**
     * @param array $args
     * @param IDbService $dbService
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function searchByText(array $args, IDbService $dbService) {
        $dbService->openDb();

        $searchItems = SearchHelper::checkEscapeSearchItems($dbService, $args[self::ARG_SEARCH_ITEMS]);
        $searchText = StringNumberService::checkEscapeString($dbService, $args[self::ARG_SEARCH_TEXT], 1, 100);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $args[self::ARG_TOKEN]);

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
                    $airports = SearchItemAirport::searchByText($dbService, $searchText, self::getMaxTextResults($resultNum), $email);
                    $resultNum += count($airports);
                    break;
                case SearchItem::NAVAIDS:
                    $navaids = SearchItemNavaid::searchByText($dbService, $searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItem::REPORTINGPOINTS:
                    $reportingPoints = SearchItemReportingPoint::searchByText($dbService, $searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItem::USERPOINTS:
                    $userPoints = SearchItemUserPoint::searchByText($dbService, $searchText, self::getMaxTextResults($resultNum), $email);
                    $resultNum += count($userPoints);
                    break;
                case SearchItem::GEONAMES:
                    $geonames = SearchItemGeoname::searchByText($dbService, $searchText, self::getMaxTextResults($resultNum));
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

        $dbService->closeDb();
    }


    private static function getMaxTextResults(int $resultNum): int {
        return max(min(self::MAX_TEXT_SEARCH_RESULTS - $resultNum, self::MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
