<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\ProdNavplanDiContainer;


require_once __DIR__ . "/../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

$importer = $diContainer->getOpenAipDiContainer()->getOpenAipImporter();
$importer->importNavaids();
$importer->importAirports();
$importer->importAirspaces();
