<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\MeteoDwd\Rest\Model\RestForecastRunConverter;
use Navplan\MeteoDwd\Rest\Model\RestVerticalCloudColumnConverter;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";

const ARG_POS_LAT = "lat";
const ARG_POS_LON = "lon";
const ARG_FORECAST_RUN = "forecastrun";


$diContainer = new ProdNavplanDiContainer();
$httpService = $diContainer->getSystemDiContainer()->getHttpService();
$verticalCloudService = $diContainer->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudService();

$args = $httpService->getGetArgs();
$forecastRun = RestForecastRunConverter::fromRest($args[ARG_FORECAST_RUN]);
$pos = RestPosition2dConverter::fromRest([$args[ARG_POS_LON], $args[ARG_POS_LAT]]);

$verticalCloudColumnSteps = $verticalCloudService->readPositionalVerticalClouds($forecastRun, $pos);
$httpService->sendArrayResponse(RestVerticalCloudColumnConverter::toRestList($verticalCloudColumnSteps));
