<?php declare(strict_types=1);

namespace Navplan\Search;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getSearchDiContainer()->getSearchController();
$controller->processRequest();
