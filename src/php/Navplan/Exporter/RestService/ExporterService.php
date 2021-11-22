<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$postArgs = json_decode(file_get_contents('php://input'), TRUE);

ExporterServiceProcessor::processRequest($postArgs, $diContainer);
