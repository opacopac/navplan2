<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use Navplan\Airport\DomainService\IAirportChartRepo;
use Navplan\System\DomainService\IHttpService;


interface IAirportChartServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirportChartRepo(): IAirportChartRepo;
}
