<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\RestService\MeteoSmaController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

MeteoSmaController::processRequest(
    $diContainer->getMeteoSmaDiContainer()->getMeteoSmaService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
