<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getNavaidDiContainer()->getNavaidController();
$controller->processRequest();
