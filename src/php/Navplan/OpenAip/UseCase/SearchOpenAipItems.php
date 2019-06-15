<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\OpenAip\Domain\SearchAreaItemsRequest;
use Navplan\OpenAip\Domain\SearchAreaItemsResponse;
use Navplan\OpenAip\Domain\SearchPointItemsRequest;
use Navplan\OpenAip\Domain\SearchPointItemsResponse;


class SearchOpenAipItems {
    private $config;


    public function __construct(IOpenAipConfig $config) {
        $this->config = $config;
    }


    public function searchPointItems(SearchPointItemsRequest $request): SearchPointItemsResponse {
        return new SearchPointItemsResponse(
            (new SearchAirport($this->config))->searchByExtent($request->extent, $request->zoom),
            (new SearchNavaid($this->config))->searchByExtent($request->extent, $request->zoom),
            (new SearchReportingPoint($this->config))->searchByExtent($request->extent),
            (new SearchWebcam($this->config))->searchByExtent($request->extent)
        );
    }


    public function searchAreaItems(SearchAreaItemsRequest $request): SearchAreaItemsResponse {
        return new SearchAreaItemsResponse(
            (new SearchAirspace($this->config))->searchByExtent($request->extent, $request->zoom),
            []
        );
    }
}
