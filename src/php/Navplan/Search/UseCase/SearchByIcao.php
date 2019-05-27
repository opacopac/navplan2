<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Search\Domain\SearchByIcaoQuery;
use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\Domain\SearchItemType;


class SearchByIcao {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;


    public static function search(
        SearchByIcaoQuery $query,
        ISearchConfig $config
    ): SearchResult {
        $airports = [];
        $reportingPoints = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $config->getOpenAipRepoFactory()->createAirportRepo()->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $config->getOpenAipRepoFactory()->createReportingPointRepo()->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::NOTAMS:
                    $notams = $config->getNotamRepoFactory()->createNotamRepo()->searchByIcao($query->icaoList, $query->minNotamTimestamp, $query->maxNotamTimestamp);
                    break;
            }
        }

        return new SearchResult(
            $airports,
            [],
            [],
            $reportingPoints,
            [],
            [],
            [],
            $notams
        );
    }
}
