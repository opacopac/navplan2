<?php declare(strict_types=1);

namespace Navplan\Meteo;

use Navplan\Meteo\Rest\RestReadSmaMeasurementsRequest;
use Navplan\Meteo\Rest\RestSmaMeasurementsResponse;
use Navplan\Meteo\UseCase\IMeteoConfig;
use Navplan\Meteo\UseCase\ReadSmaMeasurements;


class MeteoServiceProcessor {
    public static function processRequest(array $getArgs, IMeteoConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        $request = RestReadSmaMeasurementsRequest::fromArgs($getArgs);
        $response = (new ReadSmaMeasurements($config))->read($request);
        $httpService->sendArrayResponse(RestSmaMeasurementsResponse::toRest($response), NULL, TRUE);
    }
}
