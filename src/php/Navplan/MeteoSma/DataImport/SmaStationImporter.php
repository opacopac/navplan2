<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

require_once __DIR__ . "/../../ImporterBootstrap.php";

use Navplan\ProdNavplanDiContainer;


$diContainer = new ProdNavplanDiContainer();

$importer = new SmaStationImportProcessor(
    $diContainer->getFileService(),
    $diContainer->getMeteoRepo()
);
$importer->import();
