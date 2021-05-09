<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$getArgs = $_GET;

AirportServiceProcessor::processRequest($getArgs, $diContainer);
