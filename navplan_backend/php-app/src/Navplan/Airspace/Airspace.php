<?php declare(strict_types=1);

namespace Navplan\Airspace;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getAirspaceController();
$controller->processRequest();
