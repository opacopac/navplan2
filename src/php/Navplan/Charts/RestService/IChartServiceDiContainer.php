<?php declare(strict_types=1);

namespace Navplan\Charts\RestService;

use Navplan\Charts\UseCase\SearchByIcao\ISearchChartByIcaoUc;
use Navplan\Charts\UseCase\SearchById\ISearchChartByIdUc;
use Navplan\System\DomainService\IHttpService;


interface IChartServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchChartByIcaoUc(): ISearchChartByIcaoUc;

    function getSearchChartByIdUc(): ISearchChartByIdUc;
}
