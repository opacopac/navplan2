<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByText;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\Navaid\DomainService\INavaidRepo;
use Navplan\Search\DomainModel\SearchByTextQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchByTextUc implements ISearchByTextUc {
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    public function __construct(
        private ISearchUserPointUc $searchUserPointUc,
        private IAirportRepo $airportRepo,
        private IReportingPointRepo $reportingPointRepo,
        private INavaidRepo $navaidRepo,
        private IGeonameRepo $geonameRepo
    ) {
    }


    public function search(SearchByTextQuery $query): SearchResult {
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
                    $airports = $this->airportRepo->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->navaidRepo->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointRepo->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByText($query->searchText, $this->getMaxTextResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $this->geonameRepo->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
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
            [],
            []
        );
    }


    private function getMaxTextResults(int $resultNum): int {
        return max(min(self::MAX_TEXT_SEARCH_RESULTS - $resultNum, self::MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
