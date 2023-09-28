<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\ProdNavplanDiContainer;
use Navplan\Webcam\Rest\Service\WebcamController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

WebcamController::processRequest(
    $diContainer->getWebcamDiContainer()->getWebcamService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
