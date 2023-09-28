<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\ProdNavplanDiContainer;
use Navplan\Traffic\Rest\Service\TrafficController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TrafficController::processRequest(
    $diContainer->getSystemDiContainer()->getHttpService(),
    $diContainer->getTrafficDiContainer()->getReadOgnTrafficUc(),
    $diContainer->getTrafficDiContainer()->getReadAdsbexTrafficUc(),
    $diContainer->getTrafficDiContainer()->getReadAdsbexTrafficWithDetailsUc(),
    $diContainer->getTrafficDiContainer()->getReadTrafficDetailsUc()
);
