<?php declare(strict_types=1);

namespace Navplan\Traffic\RestService;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerAirport();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$getArgs = $_GET;
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

TrafficServiceProcessor::processRequest($requestMethod, $getArgs, $postArgs, $diContainer);
