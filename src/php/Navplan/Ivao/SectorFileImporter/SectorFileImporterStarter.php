<?php declare(strict_types=1);

namespace Navplan\Ivao\SectorFileImporter;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$circuitImporter = new SectorFileImporter(
    $diContainer->getCircuitRepo(),
    $diContainer->getScreenLogger()
);

$circuitImporter->import("Switzerland.sct");
