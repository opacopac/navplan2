<?php declare(strict_types=1);

namespace Navplan\Webcam;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getWebcamDiContainer()->getWebcamController();
$controller->processRequest();
