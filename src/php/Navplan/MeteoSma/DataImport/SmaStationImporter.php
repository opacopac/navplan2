<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

require_once __DIR__ . "/../../ConsoleBootstrap.php";

use Navplan\ProdNavplanDiContainerImporter;


$diContainer = new ProdNavplanDiContainerImporter();

$importer = new SmaStationImportProcessor(
    $diContainer->getFileService(),
    $diContainer->getMeteoSmaService()
);
$importer->import();
