<?php declare(strict_types=1);

namespace Navplan\Airspace;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getAirspaceDiContainer()->getAirspaceController();

$controller->processRequest();
