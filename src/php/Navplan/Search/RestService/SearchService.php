<?php declare(strict_types=1);

namespace Navplan\Search\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

SearchServiceProcessor::processRequest($diContainer);
