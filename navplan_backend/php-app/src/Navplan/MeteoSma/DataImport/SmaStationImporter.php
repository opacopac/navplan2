<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


global $diContainer;

$importer = new SmaStationImportProcessor(
    $diContainer->getFileService(),
    $diContainer->getMeteoSmaService()
);
$importer->import();
