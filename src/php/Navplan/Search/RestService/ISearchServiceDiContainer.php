<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use Navplan\Search\DomainService\ISearchService;
use Navplan\System\DomainService\IHttpService;


interface ISearchServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchService(): ISearchService;
}
