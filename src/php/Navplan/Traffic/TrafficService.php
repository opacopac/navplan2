<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$requestMethod = $_SERVER['REQUEST_METHOD'];
$getArgs = $_GET;
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

TrafficServiceProcessor::processRequest($requestMethod, $getArgs, $postArgs, $config);
