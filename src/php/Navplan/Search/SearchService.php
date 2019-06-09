<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\NavplanConfigProd;


$config = new NavplanConfigProd();
$getArgs = $_GET;

SearchServiceProcessor::processRequest($getArgs, $config);
