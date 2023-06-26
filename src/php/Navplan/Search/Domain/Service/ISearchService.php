<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Service;

use Navplan\Search\Domain\Model\SearchByPositionQuery;
use Navplan\Search\Domain\Model\SearchByTextQuery;
use Navplan\Search\Domain\Model\SearchResult;


interface ISearchService  {
    public function searchByPosition(SearchByPositionQuery $query): SearchResult;

    public function searchByText(SearchByTextQuery $query): SearchResult;
}
