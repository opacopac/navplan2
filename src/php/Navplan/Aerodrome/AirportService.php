<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\RestService\AirportServiceController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AirportServiceController::processRequest(
    $diContainer->getSystemDiContainer(),
    $diContainer->getAerodromeDiContainer()
);
