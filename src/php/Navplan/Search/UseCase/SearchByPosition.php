<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Geoname\UseCase\SearchGeoname;
use Navplan\Notam\UseCase\SearchNotam;
use Navplan\OpenAip\UseCase\SearchAirport;
use Navplan\OpenAip\UseCase\SearchNavaid;
use Navplan\OpenAip\UseCase\SearchReportingPoint;
use Navplan\Search\Domain\SearchByPositionQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Domain\SearchResult;
use Navplan\User\UseCase\SearchUserPoint;


class SearchByPosition {
    const MAX_POSITION_SEARCH_RESULTS = 80;
    const MAX_POSITION_SEARCH_RESULTS_PER_ENTITY = 80;


    public static function search(
        SearchByPositionQuery $query,
        ISearchConfig $config
    ): SearchResult {
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
                    $searchAirport = new SearchAirport($config);
                    $airports = $searchAirport->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $searchNavaid = new SearchNavaid($config);
                    $navaids = $searchNavaid->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $searchReportingPoint = new SearchReportingPoint($config);
                    $reportingPoints = $searchReportingPoint->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $searchUserPoint = new SearchUserPoint($config);
                        $userPoints = $searchUserPoint->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum), $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::GEONAMES:
                    $searchGeoname = new SearchGeoname($config);
                    $geonames = $searchGeoname->searchByPosition($query->position, $query->maxRadius_deg, self::getMaxPositionResults($resultNum));
                    $resultNum += count($geonames);
                    break;
                case SearchItemType::NOTAMS:
                    $searchNotam = new SearchNotam($config);
                    $geonames = $searchNotam->searchByPosition($query->position, $query->minNotamTimestamp, $query->maxNotamTimestamp, self::getMaxPositionResults($resultNum));
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
            $notams
        );
    }


    private static function getMaxPositionResults($resultNum) {
        return max(min( self::MAX_POSITION_SEARCH_RESULTS - $resultNum, self::MAX_POSITION_SEARCH_RESULTS_PER_ENTITY), 0);
    }
}
