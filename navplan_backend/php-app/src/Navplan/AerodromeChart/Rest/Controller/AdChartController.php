<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\AerodromeChart\Rest\Converter\RestAirportChart2Converter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdChartController implements IRestController
{
    public function __construct(
        private IHttpService $httpService,
        private IAirportChartService $airportChartService,
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $id = RestIdConverter::getId($this->httpService->getGetArgs());
                $adChart = $this->airportChartService->getAdChart2ById($id);
                $response = RestAirportChart2Converter::toRest($adChart);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
