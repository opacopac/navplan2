<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\Domain\Service\IAirportCircuitService;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeDiContainer
{
    function getAirportController(): IRestController;

    function getAirportCircuitController(): IRestController;

    function getReportingPointController(): IRestController;

    function getAirportService(): IAirportService;

    function getAirportCircuitService(): IAirportCircuitService;

    function getReportingPointService(): IReportingPointService;
}
