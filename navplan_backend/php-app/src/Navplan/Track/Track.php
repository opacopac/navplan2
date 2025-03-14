<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$controller = $diContainer->getTrackDiContainer()->getTrackController();

$controller->processRequest();
