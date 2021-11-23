<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByText;

use Navplan\Search\UseCase\SearchResult;


interface ISearchByTextUc {
    function search(SearchByTextQuery $query): SearchResult;
}
