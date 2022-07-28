<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\RestService\MeteoServiceController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

MeteoServiceController::processRequest(
    $diContainer->getMeteoSmaDiContainer(),
    $diContainer->getSystemDiContainer()
);
