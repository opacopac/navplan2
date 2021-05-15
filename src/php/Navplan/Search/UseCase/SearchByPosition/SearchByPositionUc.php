<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByPosition;

use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Aerodrome\DomainService\IReportingPointRepo;
use Navplan\Enroute\DomainService\INavaidRepo;
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchByPositionUc implements ISearchByPositionUc {
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public function __construct(
        private ISearchUserPointUc $searchUserPointUc,
        private ISearchNotamUc $searchNotamUc,
        private IAirportRepo $airportRepo,
        private IReportingPointRepo $reportingPointRepo,
        private INavaidRepo $navaidRepo,
        private IGeonameRepo $geonameRepo
    ) {
    }


    public function search(SearchByPositionQuery $query): SearchResult {
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
                    $airports = $this->airportRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->navaidRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->reportingPointRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $this->geonameRepo->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
                case SearchItemType::NOTAMS:
                    $geonames = $this->searchNotamUc->searchByPosition($query->position, $query->minNotamTimestamp, $query->maxNotamTimestamp, self::getMaxPositionResults($resultNum));
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
            $notams,
            []
        );
    }


    private static function getMaxPositionResults($resultNum) {
        return max(min( self::MAX_POSITION_SEARCH_RESULTS - $resultNum, self::MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
