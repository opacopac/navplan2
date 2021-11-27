<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByPosition;

use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Aerodrome\DomainService\IReportingPointRepo;
use Navplan\Enroute\DomainService\INavaidService;
use Navplan\Geoname\DomainService\IGeonameService;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\UseCase\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchByPositionUc implements ISearchByPositionUc {
    const SEARCH_RESULTS_HARDLIMIT = 100;


    public function __construct(
        private ISearchUserPointUc  $searchUserPointUc,
        private ISearchNotamUc      $searchNotamUc,
        private IAirportRepo        $airportRepo,
        private IReportingPointRepo $reportingPointRepo,
        private INavaidService      $navaidRepo,
        private IGeonameService     $geonameService
    ) {
    }


    public function search(SearchByPositionQuery $query): SearchResult {
        $resultNum = 0;
        $maxResults = min($query->maxResults, self::SEARCH_RESULTS_HARDLIMIT);
        $airports = [];
        $navaids = [];
        $reportingPoints = [];
        $userPoints = [];
        $geonames = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= $maxResults)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $this->airportRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->navaidRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum, $maxResults));
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
                case SearchItemType::NOTAMS:
                    $response = $this->searchNotamUc->searchByPosition($query->position, $query->minNotamTimestamp, $query->maxNotamTimestamp, self::getMaxPositionResults($resultNum, $maxResults));
                    $notams = $response->notams;
                    $resultNum += count($notams);
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
            $notams,
            []
        );
    }


    private static function getMaxPositionResults($resultNum, $maxResults) {
        return max($maxResults - $resultNum, 0);
    }
}
