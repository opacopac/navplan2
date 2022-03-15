<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

VerticalMapServiceProcessor::processRequest($diContainer);
