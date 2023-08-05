<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use Navplan\MeteoGram\Rest\Model\RestCloudMeteogramConverter;
use Navplan\MeteoGram\Rest\Model\RestReadCloudMeteogramRequestConverter;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../RestServiceBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$httpService = $diContainer->getSystemDiContainer()->getHttpService();
$meteoGramService = $diContainer->getMeteoGramDiContainer()->getCloudMeteoGramService();

$args = $httpService->getGetArgs();
$request = RestReadCloudMeteogramRequestConverter::fromRest($args);
$response = $meteoGramService->readCloudMeteoGram($request);
$httpService->sendArrayResponse(RestCloudMeteogramConverter::toRest($response));
