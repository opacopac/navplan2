<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\ProdNavplanDiContainer;
use Navplan\Webcam\Rest\Service\WebcamServiceController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

WebcamServiceController::processRequest(
    $diContainer->getWebcamDiContainer()->getWebcamService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
