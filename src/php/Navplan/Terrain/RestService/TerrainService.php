<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

TerrainServiceProcessor::processRequest($diContainer);
