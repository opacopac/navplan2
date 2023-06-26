<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\ProdNavplanDiContainer;
use Navplan\Track\Rest\Service\TrackController;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

TrackController::processRequest(
    $diContainer->getSystemDiContainer()->getHttpService(),
    $diContainer->getTrackDiContainer()->getTrackService()
);
