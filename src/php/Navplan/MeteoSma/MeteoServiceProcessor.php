<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use Navplan\MeteoSma\Rest\RestReadSmaMeasurementsRequest;
use Navplan\MeteoSma\Rest\RestSmaMeasurementsResponse;
use Navplan\MeteoSma\UseCase\IMeteoConfig;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements;


class MeteoServiceProcessor {
    public static function processRequest(array $getArgs, IMeteoConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        $request = RestReadSmaMeasurementsRequest::fromArgs($getArgs);
        $response = (new ReadSmaMeasurements($config))->read($request);
        $httpService->sendArrayResponse(RestSmaMeasurementsResponse::toRest($response), NULL, TRUE);
    }
}
