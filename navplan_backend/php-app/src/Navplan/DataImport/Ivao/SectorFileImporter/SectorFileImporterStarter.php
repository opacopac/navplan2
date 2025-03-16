<?php declare(strict_types=1);

namespace Navplan\Ivao\SectorFileImporter;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


global $diContainer;

$circuitImporter = new SectorFileImporter(
    $diContainer->getAirportCircuitService(),
    $diContainer->getSystemDiContainer()->getLoggingService()
);

$circuitImporter->import("Switzerland.sct");
