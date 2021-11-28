<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

AirportServiceProcessor::processRequest($diContainer);
