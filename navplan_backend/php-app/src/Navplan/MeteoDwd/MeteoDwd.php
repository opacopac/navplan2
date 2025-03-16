<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getMeteoDwdDiContainer()->getMeteoDwdController();
$controller->processRequest();
