<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\ProdNavplanDiContainer;
use Navplan\VerticalMap\RestService\VerticalMapServiceController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

VerticalMapServiceController::processRequest(
    $diContainer->getVerticalMapDiContainer()->getVerticalMapService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
