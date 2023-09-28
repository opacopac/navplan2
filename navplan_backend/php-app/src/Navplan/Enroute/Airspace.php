<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getEnrouteDiContainer()->getAirspaceController();

$controller->processRequest();
