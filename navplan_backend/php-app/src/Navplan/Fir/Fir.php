<?php declare(strict_types=1);

namespace Navplan\Fir;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getFirDiContainer()->getFirController();
$controller->processRequest();

