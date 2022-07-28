<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

SearchServiceController::processRequest(
    $diContainer->getSearchDiContainer(),
    $diContainer->getSystemDiContainer()
);
