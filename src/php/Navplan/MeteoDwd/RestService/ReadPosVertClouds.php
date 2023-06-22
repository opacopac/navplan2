<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use Navplan\MeteoDwd\RestModel\RestReadPosVerticalCloudsRequestConverter;
use Navplan\MeteoDwd\RestModel\RestReadPosVerticalCloudsResponseConverter;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$httpService = $diContainer->getSystemDiContainer()->getHttpService();
$verticalCloudService = $diContainer->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudService();
$args = $httpService->getGetArgs();

$request = RestReadPosVerticalCloudsRequestConverter::fromRest($args);
$response = $verticalCloudService->readPositionalVerticalClouds($request);
$httpService->sendArrayResponse(RestReadPosVerticalCloudsResponseConverter::toRest($response));
