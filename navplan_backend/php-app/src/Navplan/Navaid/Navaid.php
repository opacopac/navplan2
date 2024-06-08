<?php declare(strict_types=1);

namespace Navplan\Navaid;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getEnrouteDiContainer()->getNavaidController();

$controller->processRequest();
