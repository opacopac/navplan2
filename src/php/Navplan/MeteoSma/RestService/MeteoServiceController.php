<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestService;

use Navplan\MeteoSma\IMeteoSmaDiContainer;
use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsRequest;
use Navplan\MeteoSma\RestModel\RestReadSmaMeasurementsResponse;
use Navplan\System\ISystemDiContainer2;


class MeteoServiceController {
    public static function processRequest(
        IMeteoSmaDiContainer $meteoSmadiContainer,
        ISystemDiContainer2 $systemDiContainer
    ) {
        $getArgs = $systemDiContainer->getHttpService()->getGetArgs();
        $request = RestReadSmaMeasurementsRequest::fromRest($getArgs);
        $smaMeasurements = $meteoSmadiContainer->getMeteoSmaService()->readSmaMeasurements($request->extent);
        $response = new RestReadSmaMeasurementsResponse($smaMeasurements);
        $meteoSmadiContainer->getHttpService()->sendArrayResponse($response->toRest(), NULL, TRUE);
    }
}
