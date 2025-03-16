<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getAerodromeDiContainer()->getAirportCircuitController();
$controller->processRequest();
