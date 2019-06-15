<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Notam\Domain\ReadNotamByExtentRequest;
use Navplan\Notam\UseCase\SearchNotam;
use Navplan\OpenAip\UseCase\SearchAirport;
use Navplan\OpenAip\UseCase\SearchAirspace;
use Navplan\OpenAip\UseCase\SearchNavaid;
use Navplan\OpenAip\UseCase\SearchReportingPoint;
use Navplan\OpenAip\UseCase\SearchWebcam;
use Navplan\Search\Domain\SearchByExtentQuery;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\Domain\SearchItemType;
use Navplan\User\UseCase\SearchUserPoint;


class SearchByExtent {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;


    public static function search(
        SearchByExtentQuery $query,
        ISearchConfig $config
    ): SearchResult {
        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $airspaces = [];
        $reportingPoints = [];
        $userPoints = [];
        $webcams = [];
        $notams = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= self::MAX_EXTENT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $searchAirport = new SearchAirport($config);
                    $airports = $searchAirport->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $searchNavaid = new SearchNavaid($config);
                    $navaids = $searchNavaid->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::AIRSPACES:
                    $searchAirspace = new SearchAirspace($config);
                    $airspaces = $searchAirspace->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airspaces);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $searchReportingPoint = new SearchReportingPoint($config);
                    $reportingPoints = $searchReportingPoint->searchByExtent($query->extent);
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $searchUserPoint = new SearchUserPoint($config);
                        $userPoints = $searchUserPoint->searchByExtent($query->extent, $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::WEBCAMS:
                    $searchWebcam = new SearchWebcam($config);
                    $webcams = $searchWebcam->searchByExtent($query->extent);
                    $resultNum += count($webcams);
                    break;
                case SearchItemType::NOTAMS:
                    $searchNotam = new SearchNotam($config);
                    $request = new ReadNotamByExtentRequest($query->extent, $query->zoom, $query->minNotamTimestamp, $query->maxNotamTimestamp);
                    $notams = $searchNotam->searchByExtent($request)->notams;
                    $resultNum += count($notams);
                    break;
            }
        }

        return new SearchResult(
            $airports,
            $navaids,
            $airspaces,
            $reportingPoints,
            $userPoints,
            $webcams,
            [],
            $notams
        );
    }
}
