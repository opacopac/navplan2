<?php declare(strict_types=1);

namespace Navplan\Search\DomainService;

use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchByTextQuery;
use Navplan\Search\DomainModel\SearchResult;


interface ISearchService  {
    public function searchByPosition(SearchByPositionQuery $query): SearchResult;

    public function searchByText(SearchByTextQuery $query): SearchResult;
}
