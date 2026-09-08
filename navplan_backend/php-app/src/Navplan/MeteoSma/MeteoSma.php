<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getMeteoSmaController();
$controller->processRequest();
