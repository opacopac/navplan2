<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\MeteoSma\DomainService\IMeteoSmaService;
use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsRequest;
use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsResponse;
use Navplan\System\DomainService\IHttpService;


class MeteoServiceController {
    public static function processRequest(
        IMeteoSmaService $meteoSmaService,
        IHttpService $httpService
    ) {
        $getArgs = $httpService->getGetArgs();
        $request = RestReadSmaMeasurementsRequest::fromRest($getArgs);
        $smaMeasurements = $meteoSmaService->readSmaMeasurements($request->extent);
        $response = new RestReadSmaMeasurementsResponse($smaMeasurements);
        $httpService->sendArrayResponse($response->toRest(), NULL, TRUE);
    }
}
