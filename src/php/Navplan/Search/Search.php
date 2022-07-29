<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\ProdNavplanDiContainer;
use Navplan\Search\RestService\SearchController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

SearchController::processRequest(
    $diContainer->getSearchDiContainer()->getSearchService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
