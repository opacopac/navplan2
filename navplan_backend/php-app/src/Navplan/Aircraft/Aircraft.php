<?php declare(strict_types=1);

namespace Navplan\Aircraft;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getAircraftDiContainer()->getAircraftController();
$controller->processRequest();
