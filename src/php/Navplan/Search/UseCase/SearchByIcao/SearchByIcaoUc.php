<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByIcao;

use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Aerodrome\DomainService\IReportingPointRepo;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\Search\DomainModel\SearchByIcaoQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;


class SearchByIcaoUc implements ISearchByIcaoUc {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;

    public function __construct(
        private ISearchNotamUc $searchNotamUc,
        private IAirportRepo $airportRepo,
        private IReportingPointRepo $reportingPointRepo
    ) {
    }


    public function search(SearchByIcaoQuery $query): SearchResult {
        $airports = [];
        $reportingPoints = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $this->airportRepo->searchByIcao($query->icaoList);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointRepo->searchByIcao($query->icaoList);
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
            $notams,
            []
        );
    }
}
