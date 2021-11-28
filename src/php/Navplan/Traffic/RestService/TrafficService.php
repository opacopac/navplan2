<?php declare(strict_types=1);

namespace Navplan\Traffic\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TrafficServiceProcessor::processRequest($diContainer);
