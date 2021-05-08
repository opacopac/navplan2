<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchOpenAipItem;

use Navplan\OpenAip\DomainModel\SearchAreaItemsRequest;
use Navplan\OpenAip\DomainModel\SearchAreaItemsResponse;
use Navplan\OpenAip\DomainModel\SearchPointItemsRequest;
use Navplan\OpenAip\DomainModel\SearchPointItemsResponse;
use Navplan\OpenAip\UseCase\SearchAirport\ISearchAirportUc;
use Navplan\OpenAip\UseCase\SearchAirspace\ISearchAirspaceUc;
use Navplan\OpenAip\UseCase\SearchNavaid\ISearchNavaidUc;
use Navplan\OpenAip\UseCase\SearchReportingPoint\ISearchReportingPointUc;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;


class SearchOpenAipItemsUc implements ISearchOpenAipItemsUc {
    public function __construct(
        private ISearchAirportUc $searchAirportUc,
        private ISearchNavaidUc $searchNavaidUc,
        private ISearchReportingPointUc $searchReportingPointUc,
        private ISearchWebcamUc $searchWebcamUc,
        private ISearchAirspaceUc $searchAirspaceUc,
    ) {
    }


    public function searchPointItems(SearchPointItemsRequest $request): SearchPointItemsResponse {
        return new SearchPointItemsResponse(
            $this->searchAirportUc->searchByExtent($request->extent, $request->zoom),
            $this->searchNavaidUc->searchByExtent($request->extent, $request->zoom),
            $this->searchReportingPointUc->searchByExtent($request->extent),
            $this->searchWebcamUc->searchByExtent($request->extent)
        );
    }


    public function searchAreaItems(SearchAreaItemsRequest $request): SearchAreaItemsResponse {
        return new SearchAreaItemsResponse(
            $this->searchAirspaceUc->searchByExtent($request->extent, $request->zoom),
            []
        );
    }
}