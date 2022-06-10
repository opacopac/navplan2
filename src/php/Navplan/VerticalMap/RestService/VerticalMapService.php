<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

VerticalMapServiceProcessor::processRequest($diContainer);
