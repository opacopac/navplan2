<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByExtent;

use Navplan\Search\DomainModel\SearchByExtentQuery;
use Navplan\Search\DomainModel\SearchResult;


interface ISearchByExtentUc {
    function search(SearchByExtentQuery $query): SearchResult;
}
