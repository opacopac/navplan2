<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;
use Navplan\MeteoSma\DataImport\SmaStationImportProcessor;


$config = new NavplanConfigProd();
$importer = new SmaStationImportProcessor($config);
$importer->import();
