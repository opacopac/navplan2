<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Search\Domain\SearchByPositionQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchResult;


class SearchByPosition {
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public static function search(
        SearchByPositionQuery $query,
        ISearchConfig $config
    ): SearchResult {
        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= self::MAX_POSITION_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $config->getOpenAipRepoFactory()->createAirportRepo()->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $config->getOpenAipRepoFactory()->createNavaidRepo()->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $config->getOpenAipRepoFactory()->createReportingPointRepo()->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $config->getUserRepoFactory()->createUserPointRepo()->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $config->getGeonameRepoFactory()->createGeonameRepo()->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
                case SearchItemType::NOTAMS:
                    $geonames = $config->getNotamRepoFactory()->createNotamRepo()->searchByPosition($query->position, $query->minNotamTimestamp, $query->maxNotamTimestamp, self::getMaxPositionResults($resultNum));
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
            $notams
        );
    }


    private static function getMaxPositionResults($resultNum)
    {
        return max(min( self::MAX_POSITION_SEARCH_RESULTS - $resultNum, self::MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
