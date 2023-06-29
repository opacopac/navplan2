<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use Navplan\MeteoDwd\Rest\Model\RestCloudMeteogramStepConverter;
use Navplan\MeteoDwd\Rest\Model\RestReadCloudMeteogramRequestConverter;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$httpService = $diContainer->getSystemDiContainer()->getHttpService();
$verticalCloudService = $diContainer->getMeteoDwdDiContainer()->getMeteoDwdVerticalCloudService();

$args = $httpService->getGetArgs();
$request = RestReadCloudMeteogramRequestConverter::fromRest($args);

$cloudMeteogramSteps = $verticalCloudService->readCloudMeteoGramSteps($request);
$httpService->sendArrayResponse(RestCloudMeteogramStepConverter::toRestList($cloudMeteogramSteps));
