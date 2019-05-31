<?php declare(strict_types=1);

namespace Navplan\Search;


$getArgs = $_GET;
$config = new SearchConfigProd();
SearchServiceProcessor::processRequest($getArgs, $config);
