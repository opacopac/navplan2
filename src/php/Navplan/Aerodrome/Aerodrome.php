<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\RestService\AirportController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AirportController::processRequest(
    $diContainer->getSystemDiContainer()->getHttpService(),
    $diContainer->getAerodromeDiContainer()->getAirportService(),
    $diContainer->getAerodromeDiContainer()->getAirportCircuitService(),
    $diContainer->getAerodromeDiContainer()->getAirportChartService(),
    $diContainer->getAerodromeDiContainer()->getReportingPointService()
);
