<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

AirportServiceProcessor::processRequest($diContainer);
