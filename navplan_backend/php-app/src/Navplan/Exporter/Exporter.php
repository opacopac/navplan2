<?php declare(strict_types=1);

namespace Navplan\Exporter;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getExportDiContainer()->getExportController();
$controller->processRequest();
