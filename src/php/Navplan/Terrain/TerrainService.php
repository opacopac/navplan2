<?php declare(strict_types=1);

namespace Navplan\Terrain;


$reqMethod = $_SERVER['REQUEST_METHOD'];
$getArgs = $_GET;
$postArgs = json_decode(file_get_contents('php://input'), TRUE);
$config = new FlightrouteConfigProd();

FlightrouteServiceProcessor::processRequest($reqMethod, $getArgs, $postArgs, $config);
