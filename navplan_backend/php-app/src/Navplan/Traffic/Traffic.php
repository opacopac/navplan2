<?php declare(strict_types=1);

namespace Navplan\Traffic;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getTrafficDiContainer()->getTrafficController();
$controller->processRequest();
