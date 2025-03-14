<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getTrafficDiContainer()->getTrafficController();

$controller->processRequest();
