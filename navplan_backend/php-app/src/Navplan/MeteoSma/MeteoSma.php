<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getMeteoSmaDiContainer()->getMeteoSmaController();

$controller->processRequest();
