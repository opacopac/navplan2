<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

FlightrouteServiceProcessor::processRequest($diContainer);
