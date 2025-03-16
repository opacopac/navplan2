<?php declare(strict_types=1);

namespace Navplan\OpenAip;

require_once __DIR__ . "/../ConsoleBootstrap.php";


global $diContainer;

$importer = $diContainer->getOpenAipDiContainer()->getOpenAipImporter();
$importer->importNavaids();
$importer->importAirports();
$importer->importAirspaces();
