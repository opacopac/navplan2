<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

SearchServiceProcessor::processRequest($diContainer);
