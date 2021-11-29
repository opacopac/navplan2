<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsRequest;
use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsResponse;


class MeteoServiceProcessor {
    public static function processRequest(IMeteoServiceDiContainer $diContainer) {
        $getArgs = $diContainer->getHttpService()->getGetArgs();
        $request = RestReadSmaMeasurementsRequest::fromRest($getArgs);
        $smaMeasurements = $diContainer->getMeteoSmaService()->readSmaMeasurements($request->extent);
        $response = new RestReadSmaMeasurementsResponse($smaMeasurements);
        $diContainer->getHttpService()->sendArrayResponse($response->toRest(), NULL, TRUE);
    }
}
