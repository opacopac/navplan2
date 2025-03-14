<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getWebcamDiContainer()->getWebcamController();

$controller->processRequest();
