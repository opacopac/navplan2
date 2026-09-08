<?php declare(strict_types=1);

namespace Navplan\Track;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getTrackController();
$controller->processRequest();
