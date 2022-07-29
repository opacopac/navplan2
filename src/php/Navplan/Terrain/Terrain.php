<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\ProdNavplanDiContainer;
use Navplan\Terrain\RestService\TerrainController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TerrainController::processRequest(
    $diContainer->getTerrainDiContainer()->getTerrainService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
