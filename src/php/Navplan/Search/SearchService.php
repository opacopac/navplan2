<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Search\Rest\SearchServiceProcessor;


$getArgs = $_GET;
$config = new SearchConfigProd();
SearchServiceProcessor::processRequest($getArgs, $config);
