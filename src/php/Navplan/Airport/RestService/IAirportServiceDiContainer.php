<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use Navplan\Airport\DomainService\IAirportChartRepo;
use Navplan\Airport\DomainService\IAirportCircuitRepo;
use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\Airport\DomainService\IReportingPointRepo;
use Navplan\System\DomainService\IHttpService;


interface IAirportServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirportRepo(): IAirportRepo;

    function getAirportCircuitRepo(): IAirportCircuitRepo;

    function getReportingPointRepo(): IReportingPointRepo;

    function getAirportChartRepo(): IAirportChartRepo;
}
