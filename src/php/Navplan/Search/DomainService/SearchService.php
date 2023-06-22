<?php declare(strict_types=1);

namespace Navplan\Search\DomainService;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchByTextQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchService implements ISearchService {
    const SEARCH_RESULTS_HARDLIMIT = 100;
    const MAX_TEXT_SEARCH_RESULTS = 25;
    const MAX_TEXT_SEARCH_RESULTS_PER_ENTITY = 10;


    public function __construct(
        private ISearchUserPointUc  $searchUserPointUc,
        private IAirspaceService    $airspaceService,
        private INotamService       $notamService,
        private IAirportService     $airportService,
        private IReportingPointService $reportingPointService,
        private INavaidService      $navaidService,
        private IGeonameService     $geonameService
    ) {
    }


    public function searchByPosition(SearchByPositionQuery $query): SearchResult {
        $resultNum = 0;
        $maxResults = min($query->maxResults, self::SEARCH_RESULTS_HARDLIMIT);
        $airports = [];
        $navaids = [];
        $airspaces = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= $maxResults)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $this->airportService->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->navaidService->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointService->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $this->geonameService->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($geonames);
                    break;
            }
        }

        if (in_array(SearchItemType::AIRSPACES, $query->searchItems)) {
            $airspaces = $this->airspaceService->searchByPosition($query->position);
        }

        if (in_array(SearchItemType::NOTAMS, $query->searchItems)) {
            $notams = $this->notamService->searchByPosition($query->position, $query->minNotamTimestamp, $query->maxNotamTimestamp);
        }

        return new SearchResult($airports, $navaids, $airspaces, $reportingPoints, $userPoints, [], $geonames, $notams, []);
    }


    private static function getMaxPositionResults($resultNum, $maxResults) {
        return max($maxResults - $resultNum, 0);
    }


    public function searchbyText(SearchByTextQuery $query): SearchResult {
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
                    $airports = $this->airportService->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->navaidService->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointService->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByText($query->searchText, $this->getMaxTextResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $this->geonameService->searchByText($query->searchText, $this->getMaxTextResults($resultNum));
                    $resultNum += count($geonames);
                    break;
            }
        }

        return new SearchResult($airports, $navaids, [], $reportingPoints, $userPoints, [], $geonames, [], [], []);
    }


    private function getMaxTextResults(int $resultNum): int {
        return max(min(self::MAX_TEXT_SEARCH_RESULTS - $resultNum, self::MAX_TEXT_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
