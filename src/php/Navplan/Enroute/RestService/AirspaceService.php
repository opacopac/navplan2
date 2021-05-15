<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$getArgs = $_GET;

AirspaceServiceProcessor::processRequest($getArgs, $diContainer);
