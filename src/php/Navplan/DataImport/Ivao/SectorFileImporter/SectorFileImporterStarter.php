<?php declare(strict_types=1);

namespace Navplan\Ivao\SectorFileImporter;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainerImporter();
$circuitImporter = new SectorFileImporter(
    $diContainer->getAirportCircuitService(),
    $diContainer->getScreenLogger()
);

$circuitImporter->import("Switzerland.sct");
