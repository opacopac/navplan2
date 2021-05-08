<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$config = new ProdNavplanDiContainerAirport();
$getArgs = $_GET;

OpenAipServiceProcessor::processRequest($getArgs, $config);
