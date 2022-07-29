<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Enroute\Rest\Service\NavaidController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

NavaidController::processRequest(
    $diContainer->getEnrouteDiContainer()->getNavaidService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
