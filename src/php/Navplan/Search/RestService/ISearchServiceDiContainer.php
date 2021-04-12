<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use Navplan\Search\UseCase\SearchByExtent\ISearchByExtentUc;
use Navplan\Search\UseCase\SearchByIcao\ISearchByIcaoUc;
use Navplan\Search\UseCase\SearchByPosition\ISearchByPositionUc;
use Navplan\Search\UseCase\SearchByText\ISearchByTextUc;
use Navplan\System\DomainService\IHttpService;


interface ISearchServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchByExtentUc(): ISearchByExtentUc;

    function getSearchByIcaoUc(): ISearchByIcaoUc;

    function getSearchByPositionUc(): ISearchByPositionUc;

    function getSearchByTextUc(): ISearchByTextUc;
}
