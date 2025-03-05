<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\ProdNavplanDiContainer;

include_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getUserDiContainer()->getUserController();

$controller->processRequest();
