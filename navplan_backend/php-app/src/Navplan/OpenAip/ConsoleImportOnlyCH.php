<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipImportFilter;
use Navplan\ProdNavplanDiContainer;


require_once __DIR__ . "/../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

$importFilter = new OpenAipImportFilter("CH");
$importer = $diContainer->getOpenAipDiContainer()->getOpenAipImporter();
$importer->setImportFilter($importFilter);
$importer->importNavaids();
$importer->importAirports();
$importer->importAirspaces();
