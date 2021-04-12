<?php declare(strict_types=1);

namespace Navplan\Notam\RestService;

use Navplan\Notam\UseCase\SearchNotam\ISearchNotamUc;
use Navplan\System\DomainService\IHttpService;


interface INotamServiceDiContainer {
    function getHttpService(): IHttpService;

    function getSearchNotamUc(): ISearchNotamUc;
}
