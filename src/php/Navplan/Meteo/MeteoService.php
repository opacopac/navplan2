<?php declare(strict_types=1);

namespace Navplan\Meteo;

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$getArgs = $_GET;

MeteoServiceProcessor::processRequest($getArgs, $config);
