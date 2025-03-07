<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getAerodromeDiContainer()->getAirportCircuitController();

$controller->processRequest();
