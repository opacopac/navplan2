<?php declare(strict_types=1);

namespace Navplan\Ivao\SectorFileImporter;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainerAirport();
$circuitImporter = new SectorFileImporter(
    $diContainer->getAirportCircuitRepo(),
    $diContainer->getScreenLogger()
);

$circuitImporter->import("Switzerland.sct");
