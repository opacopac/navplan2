<?php declare(strict_types=1);

namespace Navplan\Terrain;

use Navplan\ProdNavplanDiContainer;
use Navplan\Terrain\RestService\TerrainServiceController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TerrainServiceController::processRequest(
    $diContainer->getTerrainDiContainer(),
    $diContainer->getSystemDiContainer()
);
