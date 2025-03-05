<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Search\Domain\Service\ISearchService;


interface ISearchDiContainer {
    function getSearchController(): IRestController;

    function getSearchService(): ISearchService;
}
