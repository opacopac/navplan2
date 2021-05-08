<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchOpenAipItem;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;
use Navplan\Airspace\DomainService\IAirspaceRepo;
use Navplan\Navaid\DomainService\INavaidRepo;
use Navplan\OpenAip\DomainModel\SearchAreaItemsRequest;
use Navplan\OpenAip\DomainModel\SearchAreaItemsResponse;
use Navplan\OpenAip\DomainModel\SearchPointItemsRequest;
use Navplan\OpenAip\DomainModel\SearchPointItemsResponse;
use Navplan\OpenAip\UseCase\SearchWebcam\ISearchWebcamUc;


class SearchOpenAipItemsUc implements ISearchOpenAipItemsUc {
    public function __construct(
        private ISearchWebcamUc $searchWebcamUc,
        private IAirportRepo $airportRepo,
        private IReportingPointRepo $reportingPointRepo,
        private INavaidRepo $navaidRepo,
        private IAirspaceRepo $airspaceRepo
    ) {
    }


    public function searchPointItems(SearchPointItemsRequest $request): SearchPointItemsResponse {
        return new SearchPointItemsResponse(
            $this->airportRepo->searchByExtent($request->extent, $request->zoom),
            $this->navaidRepo->searchByExtent($request->extent, $request->zoom),
            $this->reportingPointRepo->searchByExtent($request->extent),
            $this->searchWebcamUc->searchByExtent($request->extent)
        );
    }


    public function searchAreaItems(SearchAreaItemsRequest $request): SearchAreaItemsResponse {
        return new SearchAreaItemsResponse(
            $this->airspaceRepo->searchByExtent($request->extent, $request->zoom),
            []
        );
    }
}
