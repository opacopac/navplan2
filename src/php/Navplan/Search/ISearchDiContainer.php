<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Search\DomainService\ISearchService;


interface ISearchDiContainer {
    function getSearchService(): ISearchService;
}
