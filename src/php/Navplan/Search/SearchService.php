<?php declare(strict_types=1);

namespace Navplan\Search;

require_once __DIR__ . "/../NavplanBootstrap.php";

use Navplan\Search\Config\SearchConfigProd;
use Navplan\Search\Rest\SearchServiceProcessor;


$args = $_GET;
$config = new SearchConfigProd();
SearchServiceProcessor::processRequest($args, $config);
