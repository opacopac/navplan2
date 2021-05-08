<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByExtent;

use Navplan\Airport\DomainService\IAirportCircuitRepo;
use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\OpenAip\UseCase\SearchAirspace\ISearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;
use Navplan\Search\DomainModel\SearchByExtentQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;


class SearchByExtentUc implements ISearchByExtentUc {
    const MAX_EXTENT_SEARCH_RESULTS = 9999;
    const MAX_EXTENT_SEARCH_RESULTS_PER_ENTITY = 100;


    public function __construct(
        private ISearchNavaidUc $searchNavaidUc,
        private ISearchAirspaceUc $searchAirspaceUc,
        private ISearchReportingPointUc $searchReportingPointUc,
        private ISearchUserPointUc $searchUserPointUc,
        private ISearchNotamUc $searchNotamUc,
        private ISearchWebcamUc $searchWebcamUc,
        private IAirportRepo $airportRepo,
        private IAirportCircuitRepo $airportCircuitRepo
    ) {
    }


    public function search(SearchByExtentQuery $query): SearchResult {
        $resultNum = 0;
        $airports = [];
        $navaids = [];
        $airspaces = [];
        $reportingPoints = [];
        $userPoints = [];
        $webcams = [];
        $notams = [];
        $circuits = [];

        foreach ($query->searchItems as $searchItem) {
            if ($resultNum >= self::MAX_EXTENT_SEARCH_RESULTS)
                break;

            switch ($searchItem) {
                case SearchItemType::AIRPORTS:
                    $airports = $this->airportRepo->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airports);
                    break;
                case SearchItemType::NAVAIDS:
                    $navaids = $this->searchNavaidUc->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($navaids);
                    break;
                case SearchItemType::AIRSPACES:
                    $airspaces = $this->searchAirspaceUc->searchByExtent($query->extent, $query->zoom);
                    $resultNum += count($airspaces);
                    break;
                case SearchItemType::REPORTINGPOINTS:
                    $reportingPoints = $this->searchReportingPointUc->searchByExtent($query->extent);
                    $resultNum += count($reportingPoints);
                    break;
                case SearchItemType::USERPOINTS:
                    if ($query->token) {
                        $userPoints = $this->searchUserPointUc->searchByExtent($query->extent, $query->token);
                        $resultNum += count($userPoints);
                    }
                    break;
                case SearchItemType::WEBCAMS:
                    $webcams = $this->searchWebcamUc->searchByExtent($query->extent);
                    $resultNum += count($webcams);
                    break;
                case SearchItemType::NOTAMS:
                    $request = new ReadNotamByExtentRequest($query->extent, $query->zoom, $query->minNotamTimestamp, $query->maxNotamTimestamp);
                    $notams = $this->searchNotamUc->searchByExtent($request)->notams;
                    $resultNum += count($notams);
                    break;
                case SearchItemType::CIRCUITS:
                    $circuits = $this->airportCircuitRepo->getCircuitsByExtent($query->extent);
                    $resultNum += count($circuits);
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
            $notams,
            $circuits
        );
    }
}
