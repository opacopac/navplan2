<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

ExporterServiceProcessor::processRequest($diContainer);
