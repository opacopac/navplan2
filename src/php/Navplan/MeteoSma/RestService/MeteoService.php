<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\ProdNavplanDiContainerAirport;

require_once __DIR__ . "/../../RestServiceBootstrap.php";

$diContainer = new ProdNavplanDiContainerAirport();
MeteoServiceProcessor::processRequest($_GET, $diContainer);
