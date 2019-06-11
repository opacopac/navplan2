<?php declare(strict_types=1);

namespace Navplan\Meteo;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$getArgs = $_GET;

MeteoServiceProcessor::processRequest($getArgs, $config);
