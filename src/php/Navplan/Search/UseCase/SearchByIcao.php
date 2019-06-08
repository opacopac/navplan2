<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Notam\UseCase\SearchNotam;
use Navplan\OpenAip\UseCase\SearchAirport;
use Navplan\OpenAip\UseCase\SearchReportingPoint;
use Navplan\Search\Domain\SearchByIcaoQuery;
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
                    $searchAirport = new SearchAirport($config);
                    $airports = $searchAirport->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $searchReportingPoint = new SearchReportingPoint($config);
                    $reportingPoints = $searchReportingPoint->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::NOTAMS:
                    $searchNotam = new SearchNotam($config);
                    $notams = $searchNotam->searchByIcao($query->icaoList, $query->minNotamTimestamp, $query->maxNotamTimestamp);
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
