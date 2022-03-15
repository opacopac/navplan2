<?php declare(strict_types=1);

namespace Navplan\Notem\RestService;

require_once __DIR__ . "/../../RestServiceBootstrap.php";

use Navplan\Notam\RestService\NotamServiceProcessor;
use Navplan\ProdNavplanDiContainerImporter;


$diContainer = new ProdNavplanDiContainerImporter();

NotamServiceProcessor::processRequest($diContainer);
