<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use NavplanTest\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";

$diContainer = new ProdNavplanDiContainer();
MeteoServiceProcessor::processRequest($_GET, $diContainer);
