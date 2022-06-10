<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TerrainServiceProcessor::processRequest($diContainer);
