<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Domain\SearchResult;


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
                    $airports = $config->getOpenAipRepoFactory()->createAirportSearch()->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $config->getOpenAipRepoFactory()->createNavaidSearch()->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $config->getOpenAipRepoFactory()->createReportingPointSearch()->searchByText($query->searchText, self::getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $config->getUserRepoFactory()->createUserPointSearch()->searchByText($query->searchText, self::getMaxTextResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $config->getGeonameRepoFactory()->createGeonameRepo()->searchByText($query->searchText, self::getMaxTextResults($resultNum));
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
