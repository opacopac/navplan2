<?php declare(strict_types=1);

namespace Navplan\Flightroute;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getFlightrouteDiContainer()->getFlightrouteController();
$controller->processRequest();
