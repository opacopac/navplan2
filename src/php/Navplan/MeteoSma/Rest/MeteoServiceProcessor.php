<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest;

use Navplan\MeteoSma\UseCase\IMeteoConfig;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements;


class MeteoServiceProcessor {
    /* @var $config IMeteoConfig */
    private $config;


    public function __construct(IMeteoConfig $config) {
        $this->config = $config;
    }


    public function processRequest(array $getArgs) {
        $httpService = $this->config->getSystemServiceFactory()->getHttpService();
        $request = RestReadSmaMeasurementsRequest::fromArgs($getArgs);
        $response = (new ReadSmaMeasurements($this->config))->read($request);
        $httpService->sendArrayResponse(RestSmaMeasurementsResponse::toRest($response), NULL, TRUE);
    }
}
