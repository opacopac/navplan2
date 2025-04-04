<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeDiContainer
{
    function getAirportController(): IRestController;

    function getReportingPointController(): IRestController;

    function getAirportService(): IAirportService;

    function getReportingPointService(): IReportingPointService;
}
