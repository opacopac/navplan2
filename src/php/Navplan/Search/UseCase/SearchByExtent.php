<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchByExtentQuery;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\Domain\SearchItemType;


class SearchByExtent {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;


    public static function search(
        SearchByExtentQuery $query,
        ISearchConfig $config
    ): SearchResult {
        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $airspaces = [];
        $reportingPoints = [];
        $userPoints = [];
        $webcams = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= self::MAX_EXTENT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $config->getOpenAipRepoFactory()->createAirportRepo()->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $config->getOpenAipRepoFactory()->createNavaidRepo()->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::AIRSPACES:
                    $airspaces = $config->getOpenAipRepoFactory()->createAirspaceRepo()->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airspaces);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $config->getOpenAipRepoFactory()->createReportingPointRepo()->searchByExtent($query->extent);
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $config->getUserRepoFactory()->createUserPointRepo()->searchByExtent($query->extent, $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::WEBCAMS:
                    $webcams = $config->getOpenAipRepoFactory()->createWebcamRepo()->searchByExtent($query->extent);
                    $resultNum += count($webcams);
                    break;
                case SearchItemType::NOTAMS:
                    $notams = $config->getNotamRepoFactory()->createNotamRepo()->searchByExtent($query->extent, $query->zoom, $query->minNotamTimestamp, $query->maxNotamTimestamp);
                    $resultNum += count($notams);
                    break;
            }
        }

        return new SearchResult(
            $airports,
            $navaids,
            $airspaces,
            $reportingPoints,
            $userPoints,
            $webcams,
            [],
            $notams
        );
    }
}
