<?php declare(strict_types=1);

namespace Navplan\MetarTaf;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getMetarTafDiContainer()->getReadMetarTafController();
$controller->processRequest();
