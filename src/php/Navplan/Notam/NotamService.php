<?php declare(strict_types=1);

namespace Navplan\Notam;

require_once __DIR__ . "/../RestServiceBootstrap.php";

use Navplan\Notam\RestService\NotamServiceController;
use Navplan\ProdNavplanDiContainer;


$diContainer = new ProdNavplanDiContainer();

NotamServiceController::processRequest(
    $diContainer->getNotamDiContainer(),
    $diContainer->getSystemDiContainer()
);
