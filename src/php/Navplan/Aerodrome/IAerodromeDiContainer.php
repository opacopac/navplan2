<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\DomainService\IAirportChartService;
use Navplan\Aerodrome\DomainService\IAirportCircuitService;
use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\Aerodrome\DomainService\IReportingPointService;


interface IAerodromeDiContainer {
    function getAirportService(): IAirportService;

    function getAirportCircuitService(): IAirportCircuitService;

    function getReportingPointService(): IReportingPointService;

    function getAirportChartService(): IAirportChartService;
}
