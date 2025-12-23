<?php declare(strict_types=1);

namespace Navplan\Fir;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getAirspaceDiContainer()->getFirController();
$controller->processRequest();
