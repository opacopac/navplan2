<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getFlightrouteDiContainer()->getFlightrouteController();

$controller->processRequest();
