<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$reqMethod = $_SERVER['REQUEST_METHOD'];
$getArgs = $_GET;
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

FlightrouteServiceProcessor::processRequest($reqMethod, $getArgs, $postArgs, $config);
