<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Service;

use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Rest\Model\RestReadSmaMeasurementsRequest;
use Navplan\MeteoSma\Rest\Model\RestReadSmaMeasurementsResponse;
use Navplan\System\Domain\Service\IHttpService;


class MeteoSmaController {
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
