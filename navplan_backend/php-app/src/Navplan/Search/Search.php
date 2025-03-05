<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getSearchDiContainer()->getSearchController();

$controller->processRequest();
