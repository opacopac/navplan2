<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\ProdNavplanDiContainer;
use Navplan\Track\RestService\TrackServiceController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TrackServiceController::processRequest(
    $diContainer->getSystemDiContainer()->getHttpService(),
    $diContainer->getTrackDiContainer()->getTrackService()
);
