<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Rest\Model\RestReadSmaMeasurementsResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class MeteoSmaController implements IRestController
{
    public function __construct(
        private readonly IMeteoSmaService $meteoSmaService,
        private readonly IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($this->httpService->getGetArgs());
                $smaMeasurements = $this->meteoSmaService->readSmaMeasurements($extent);
                $response = new RestReadSmaMeasurementsResponse($smaMeasurements);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
