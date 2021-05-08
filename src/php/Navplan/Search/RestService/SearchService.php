<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerAirport();
$getArgs = $_GET;

SearchServiceProcessor::processRequest($getArgs, $diContainer);
