<?php declare(strict_types=1);

namespace Navplan\Charts\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$getArgs = $_GET;

ChartServiceProcessor::processRequest($getArgs, $diContainer);
