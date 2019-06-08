<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Geoname\UseCase\SearchGeoname;
use Navplan\OpenAip\UseCase\SearchAirport;
use Navplan\OpenAip\UseCase\SearchNavaid;
use Navplan\OpenAip\UseCase\SearchReportingPoint;
use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Domain\SearchResult;
use Navplan\User\UseCase\SearchUserPoint;


class SearchByText {
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    public static function search(
        SearchByTextQuery $query,
        ISearchConfig $config
    ): SearchResult {
        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= self::MAX_TEXT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $searchAirport = new SearchAirport($config);
                    $airports = $searchAirport->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $searchNavaid = new SearchNavaid($config);
                    $navaids = $searchNavaid->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $searchReportingPoint = new SearchReportingPoint($config);
                    $reportingPoints = $searchReportingPoint->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $searchUserPoint = new SearchUserPoint($config);
                        $userPoints = $searchUserPoint->searchByText($query->searchText, self::getMaxTextResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $searchGeoname = new SearchGeoname($config);
                    $geonames = $searchGeoname->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($geonames);
                    break;
            }
        }

        return new SearchResult(
            $airports,
            $navaids,
            [],
            $reportingPoints,
            $userPoints,
            [],
            $geonames,
            []
        );
    }


    private static function getMaxTextResults(int $resultNum): int {
        return max(min(self::MAX_TEXT_SEARCH_RESULTS - $resultNum, self::MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
