<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByIcao;

use Navplan\Search\DomainModel\SearchByIcaoQuery;
use Navplan\Search\DomainModel\SearchResult;


interface ISearchByIcaoUc {
    function search(SearchByIcaoQuery $query): SearchResult;
}
