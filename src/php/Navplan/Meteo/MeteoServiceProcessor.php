<?php declare(strict_types=1);

namespace Navplan\Meteo;

use Navplan\Meteo\Domain\ReadSmaMeasurementsResponse;
use Navplan\Meteo\Rest\RestReadSmaMeasurementsRequest;
use Navplan\Meteo\Rest\RestSmaMeasurementsResponse;
use Navplan\Meteo\UseCase\IMeteoConfig;
use Navplan\Meteo\UseCase\ReadSmaMeasurements;
use Navplan\System\UseCase\IHttpService;
use Navplan\Shared\RequestResponseHelper;


class MeteoServiceProcessor {
    public static function processRequest(array $getArgs, IMeteoConfig $config) {
        $request = RestReadSmaMeasurementsRequest::fromArgs($getArgs);
        $response = (new ReadSmaMeasurements($config))->read($request);
        self::sendSmaMeasurementsResponse($response, $config->getSystemServiceFactory()->getHttpService());
    }


    private static function sendSmaMeasurementsResponse(ReadSmaMeasurementsResponse $response, IHttpService $httpService) {
        $restResponse = RestSmaMeasurementsResponse::toRest($response);
        RequestResponseHelper::sendArrayResponse($httpService, $restResponse, NULL, TRUE);
    }
}
