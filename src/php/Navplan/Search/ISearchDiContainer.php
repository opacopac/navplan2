<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Search\Domain\Service\ISearchService;


interface ISearchDiContainer {
    function getSearchService(): ISearchService;
}
