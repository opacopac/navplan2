<?php declare(strict_types=1);

namespace Navplan\Notam;

require_once __DIR__ . "/../RestServiceBootstrap.php";

use Navplan\ProdNavplanDiContainer;


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getNotamDiContainer()->getNotamController();

$controller->processRequest();
