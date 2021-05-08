<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByPosition;

use Navplan\Geoname\UseCase\SearchGeoname\ISearchGeonameUc;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\OpenAip\UseCase\SearchAirport\ISearchAirportUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchByPositionUc implements ISearchByPositionUc {
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public function __construct(
        private ISearchAirportUc $searchAirportUc,
        private ISearchNavaidUc $searchNavaidUc,
        private ISearchReportingPointUc $searchReportingPointUc,
        private ISearchUserPointUc $searchUserPointUc,
        private ISearchNotamUc $searchNotamUc,
        private ISearchGeonameUc $searchGeonameUc
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
                    $airports = $this->searchAirportUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->searchNavaidUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->searchReportingPointUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $geonames = $this->searchGeonameUc->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
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
