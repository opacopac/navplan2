<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$reqMethod = $_SERVER['REQUEST_METHOD'];
$getArgs = $_GET;
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

TerrainServiceProcessor::processRequest($reqMethod, $getArgs, $postArgs, $diContainer);
