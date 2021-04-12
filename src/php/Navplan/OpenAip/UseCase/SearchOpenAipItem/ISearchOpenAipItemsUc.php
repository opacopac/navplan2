<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase\SearchOpenAipItem;

use Navplan\OpenAip\DomainModel\SearchAreaItemsRequest;
use Navplan\OpenAip\DomainModel\SearchAreaItemsResponse;
use Navplan\OpenAip\DomainModel\SearchPointItemsRequest;
use Navplan\OpenAip\DomainModel\SearchPointItemsResponse;


interface ISearchOpenAipItemsUc {
    function searchPointItems(SearchPointItemsRequest $request): SearchPointItemsResponse;

    function searchAreaItems(SearchAreaItemsRequest $request): SearchAreaItemsResponse;
}
