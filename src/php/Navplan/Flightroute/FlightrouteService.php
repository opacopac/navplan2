<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Flightroute\RestService\FlightrouteController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

FlightrouteController::processRequest(
    $diContainer->getFlightrouteDiContainer()->getFlightrouteService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
