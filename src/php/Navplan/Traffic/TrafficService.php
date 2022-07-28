<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\ProdNavplanDiContainer;
use Navplan\Traffic\RestService\TrafficServiceController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TrafficServiceController::processRequest(
    $diContainer->getSystemDiContainer()->getHttpService(),
    $diContainer->getTrafficDiContainer()
);
