<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Service;

use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Rest\Model\RestReadSmaMeasurementsResponse;
use Navplan\System\Domain\Service\IHttpService;


class MeteoSmaController
{
    public static function processRequest(
        IMeteoSmaService $meteoSmaService,
        IHttpService $httpService
    )
    {
        $extent = RestExtent2dConverter::fromArgs($httpService->getGetArgs());
        $smaMeasurements = $meteoSmaService->readSmaMeasurements($extent);
        $response = new RestReadSmaMeasurementsResponse($smaMeasurements);
        $httpService->sendArrayResponse($response->toRest(), NULL, TRUE);
    }
}
