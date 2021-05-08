<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerAirport();
$getArgs = $_GET;

AirportChartServiceProcessor::processRequest($getArgs, $diContainer);
