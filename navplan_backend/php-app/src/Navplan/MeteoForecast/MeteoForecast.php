<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

require_once __DIR__ . "/../RestServiceBootstrap.php";


global $diContainer;

$controller = $diContainer->getMeteoForecastDiContainer()->getMeteoForecastController();
$controller->processRequest();
