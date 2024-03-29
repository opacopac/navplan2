<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getExportDiContainer()->getExportController();

$controller->processRequest();
