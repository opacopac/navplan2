<?php declare(strict_types=1);

namespace Navplan\OpenAip;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$getArgs = $_GET;

OpenAipServiceProcessor::processRequest($getArgs, $config);
