<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Exporter\RestService\ExporterController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

ExporterController::processRequest(
    $diContainer->getExportDiContainer()->getExportService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
