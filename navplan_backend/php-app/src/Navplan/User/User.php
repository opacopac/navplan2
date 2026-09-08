<?php declare(strict_types=1);

namespace Navplan\User;

include_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getUserController();
$controller->processRequest();
