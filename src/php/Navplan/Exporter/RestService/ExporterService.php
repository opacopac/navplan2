<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();

ExporterServiceProcessor::processRequest($diContainer);
