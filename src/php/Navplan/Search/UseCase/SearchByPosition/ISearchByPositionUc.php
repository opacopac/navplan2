<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByPosition;

use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchResult;


interface ISearchByPositionUc {
    function search(SearchByPositionQuery $query): SearchResult;
}
