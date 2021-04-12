<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\OpenAip\UseCase\SearchAirport\ISearchAirportUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\Search\DomainModel\SearchByIcaoQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\Search\UseCase\SearchByIcao\ISearchByIcaoUc;


class SearchByIcaoUc implements ISearchByIcaoUc {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;

    public function __construct(
        private ISearchAirportUc $searchAirportUc,
        private ISearchReportingPointUc $searchReportingPointUc,
        private ISearchNotamUc $searchNotamUc
    ) {
    }


    public function search(SearchByIcaoQuery $query): SearchResult {
        $airports = [];
        $reportingPoints = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $this->searchAirportUc->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->searchReportingPointUc->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::NOTAMS:
                    $notams = $this->searchNotamUc->searchByIcao($query->icaoList, $query->minNotamTimestamp, $query->maxNotamTimestamp);
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
