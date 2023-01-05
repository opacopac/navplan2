<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\RestService\MeteoDwdController;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

MeteoDwdController::processRequest(
    $diContainer->getMeteoDwdDiContainer()->getMeteoDwdForecastService(),
    $diContainer->getMeteoDwdDiContainer()->getMeteoDwdWeatherService(),
    $diContainer->getMeteoDwdDiContainer()->getMeteoDwdWindService(),
    $diContainer->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudService(),
    $diContainer->getSystemDiContainer()->getHttpService()
);
