<?php declare(strict_types=1);

namespace Navplan\MeteoSma\DataImport;

require_once __DIR__ . "/../../ConsoleBootstrap.php";

use Navplan\ProdNavplanDiContainerAirport;


$diContainer = new ProdNavplanDiContainerAirport();

$importer = new SmaStationImportProcessor(
    $diContainer->getFileService(),
    $diContainer->getMeteoRepo()
);
$importer->import();
