<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestService;

use Navplan\Aerodrome\DomainService\IAirportChartRepo;
use Navplan\Aerodrome\DomainService\IAirportCircuitRepo;
use Navplan\Aerodrome\DomainService\IAirportRepo;
use Navplan\Aerodrome\DomainService\IReportingPointRepo;
use Navplan\System\DomainService\IHttpService;


interface IAirportServiceDiContainer {
    function getHttpService(): IHttpService;

    function getAirportRepo(): IAirportRepo;

    function getAirportCircuitRepo(): IAirportCircuitRepo;

    function getReportingPointRepo(): IReportingPointRepo;

    function getAirportChartRepo(): IAirportChartRepo;
}
