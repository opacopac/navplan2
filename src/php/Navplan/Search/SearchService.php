<?php declare(strict_types=1);

namespace Navplan\Search;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$getArgs = $_GET;

SearchServiceProcessor::processRequest($getArgs, $config);
