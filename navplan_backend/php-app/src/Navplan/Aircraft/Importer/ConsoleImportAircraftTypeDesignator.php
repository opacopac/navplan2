<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\ProdNavplanDiContainer;


require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

$importer = $diContainer->getAircraftDiContainer()->getAircraftTypeDesignatorImporter();
$importer->importFromJson([
    __DIR__ . "/Data/special_icao_aircraft_types.json",
    __DIR__ . "/Data/icao_aircraft_types_2024-09-09.json"
]);
