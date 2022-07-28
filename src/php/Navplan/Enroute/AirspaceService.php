<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Enroute\Rest\Service\AirspaceController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AirspaceController::processRequest(
    $diContainer->getEnrouteDiContainer()->getAirspaceService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
