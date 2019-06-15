<?php declare(strict_types=1);

namespace Navplan\Notem;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;
use Navplan\Notam\NotamServiceProcessor;


$config = new NavplanConfigProd();
$getArgs = $_GET;

NotamServiceProcessor::processRequest($getArgs, $config);
