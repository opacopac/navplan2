<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

AirspaceServiceProcessor::processRequest($diContainer);
