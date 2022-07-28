<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\RestService\MeteoDwdServiceController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

MeteoDwdServiceController::processRequest(
    $diContainer->getMeteoDwdDiContainer()->getMeteoDwdService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
