<?php declare(strict_types=1);

namespace Navplan\Notam;

require_once __DIR__ . "/../RestServiceBootstrap.php";

use Navplan\Notam\RestService\NotamController;
use Navplan\ProdNavplanDiContainer;


$diContainer = new ProdNavplanDiContainer();

NotamController::processRequest(
    $diContainer->getNotamDiContainer()->getNotamService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
