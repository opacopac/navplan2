<?php declare(strict_types=1);

namespace Navplan\Notam;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getNotamDiContainer()->getNotamController();
$controller->processRequest();
