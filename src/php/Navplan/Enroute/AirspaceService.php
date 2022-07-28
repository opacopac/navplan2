<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Enroute\Rest\Service\AirspaceServiceController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AirspaceServiceController::processRequest(
    $diContainer->getEnrouteDiContainer(),
    $diContainer->getSystemDiContainer()
);
